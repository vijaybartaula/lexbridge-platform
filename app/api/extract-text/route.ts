import { type NextRequest, NextResponse } from "next/server"

// Dynamic imports to avoid build-time issues
let pdf: any = null
let mammoth: any = null

async function loadPdfParse() {
  if (!pdf) {
    pdf = (await import("pdf-parse")).default
  }
  return pdf
}

async function loadMammoth() {
  if (!mammoth) {
    mammoth = await import("mammoth")
  }
  return mammoth
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    let extractedText = ""
    const metadata = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      pages: 1,
      language: "unknown",
      processingMethod: "unknown",
    }

    try {
      // Convert file to buffer for processing
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Handle different file types with real parsing
      if (file.type === "text/plain") {
        extractedText = await file.text()
        metadata.language = "auto-detect"
        metadata.processingMethod = "text"
      } else if (file.type === "application/pdf") {
        try {
          console.log("Processing PDF file:", file.name)
          const pdfParse = await loadPdfParse()
          const pdfData = await pdfParse(buffer)
          extractedText = pdfData.text
          metadata.pages = pdfData.numpages
          metadata.language = detectLanguage(extractedText)
          metadata.processingMethod = "pdf-parse"

          if (!extractedText || extractedText.trim().length === 0) {
            throw new Error("No text content found in PDF - document may be image-based or corrupted")
          }
        } catch (pdfError) {
          console.error("PDF parsing error:", pdfError)
          const errorMessage = pdfError instanceof Error ? pdfError.message : "Unknown PDF parsing error"
          return NextResponse.json(
            {
              error: "PDF Processing Failed",
              details: `Failed to extract text from PDF: ${errorMessage}`,
              suggestions: [
                "Ensure the PDF contains selectable text (not just images)",
                "Try converting the PDF to a Word document first",
                "Check if the PDF is password protected or corrupted",
              ],
            },
            { status: 422 },
          )
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        try {
          console.log("Processing Word document:", file.name)
          const mammothLib = await loadMammoth()
          const result = await mammothLib.extractRawText({ buffer })
          extractedText = result.value
          metadata.language = detectLanguage(extractedText)
          metadata.processingMethod = "mammoth"

          if (!extractedText || extractedText.trim().length === 0) {
            throw new Error("No text content found in Word document")
          }
        } catch (docError) {
          console.error("Word document parsing error:", docError)
          const errorMessage = docError instanceof Error ? docError.message : "Unknown Word document parsing error"
          return NextResponse.json(
            {
              error: "Word Document Processing Failed",
              details: `Failed to extract text from Word document: ${errorMessage}`,
              suggestions: [
                "Ensure the document is not corrupted",
                "Try saving the document in a different format",
                "Check if the document is password protected",
              ],
            },
            { status: 422 },
          )
        }
      } else {
        return NextResponse.json(
          {
            error: "Unsupported File Type",
            details: `File type ${file.type} is not supported`,
            supportedTypes: ["PDF (.pdf)", "Word Document (.docx, .doc)", "Plain Text (.txt)"],
            receivedType: file.type,
          },
          { status: 400 },
        )
      }

      // Validate extracted content
      if (!extractedText || extractedText.trim().length === 0) {
        return NextResponse.json(
          {
            error: "Empty Document",
            details: "No readable text content found in the document",
            suggestions: [
              "Check if the document contains actual text content",
              "Ensure the document is not just images or blank pages",
              "Try a different document format",
            ],
          },
          { status: 422 },
        )
      }

      // Clean up the extracted text
      extractedText = cleanExtractedText(extractedText)

      // Calculate additional metadata
      const wordCount = extractedText.split(/\s+/).filter((word) => word.length > 0).length
      const characterCount = extractedText.length
      const estimatedReadingTime = Math.ceil(wordCount / 200) // words per minute

      console.log(`Successfully extracted ${wordCount} words from ${file.name}`)

      return NextResponse.json({
        success: true,
        extractedText,
        metadata: {
          ...metadata,
          wordCount,
          characterCount,
          estimatedReadingTime,
          extractionTimestamp: new Date().toISOString(),
        },
      })
    } catch (processingError) {
      console.error("Document processing error:", processingError)

      // Handle specific error types
      if (processingError instanceof Error) {
        if (processingError.message.includes("Invalid PDF")) {
          return NextResponse.json(
            {
              error: "Invalid PDF File",
              details: "The uploaded file appears to be corrupted or not a valid PDF",
              suggestions: [
                "Try opening the PDF in a PDF viewer to verify it's not corrupted",
                "Re-save or re-export the PDF from the original source",
                "Convert the document to a different format",
              ],
            },
            { status: 422 },
          )
        }

        if (processingError.message.includes("password")) {
          return NextResponse.json(
            {
              error: "Password Protected Document",
              details: "The document appears to be password protected",
              suggestions: [
                "Remove password protection from the document",
                "Provide the document in an unprotected format",
                "Contact the document owner for an unprotected version",
              ],
            },
            { status: 422 },
          )
        }
      }

      return NextResponse.json(
        {
          error: "Document Processing Failed",
          details: processingError instanceof Error ? processingError.message : "Unknown processing error",
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          suggestions: [
            "Try uploading a different document",
            "Ensure the document is not corrupted",
            "Contact support if the problem persists",
          ],
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("General extraction error:", error)
    return NextResponse.json(
      {
        error: "Server Error",
        details: "An unexpected error occurred while processing your document",
        suggestions: [
          "Try uploading the document again",
          "Check your internet connection",
          "Contact support if the problem persists",
        ],
      },
      { status: 500 },
    )
  }
}

function detectLanguage(text: string): string {
  if (!text || text.trim().length === 0) return "unknown"

  const sample = text.toLowerCase().substring(0, 500)

  // Simple language detection based on common words/patterns
  const patterns = {
    spanish:
      /\b(el|la|de|que|y|en|un|es|se|no|te|lo|le|da|su|por|son|con|para|una|tiene|más|este|ya|todo|esta|muy|hacer|puede|tiempo|si|él|dos|cada|sobre|también|hasta|donde|mientras|estado|país|parte|vida|hombre|días|casa|gobierno|nueva|trabajo|año|años|mundo|durante|sin|lugar|sólo|forma|agua|poco|después|mismo|tanto|estos|todas|otro|entre|ser|hacer|poder|decir|todo|tomar|saber|llegar|pasar|tiempo|bien|año|día|dar|hombre|vez|mujer|parte|niño|ojo|caso|país|momento|forma|nombre|lugar|parte|vida|mano|cosa|hombre|día|tiempo|persona|año|mundo|país|momento|caso|parte|vida|forma|lugar|nombre|cosa|mano|ojo|vez|mujer|niño|hombre|bien|dar|año|día|tiempo|pasar|llegar|saber|tomar|todo|decir|poder|hacer|ser)\b/g,
    english:
      /\b(the|be|to|of|and|a|in|that|have|i|it|for|not|on|with|he|as|you|do|at|this|but|his|by|from|they|she|or|an|will|my|one|all|would|there|their|what|so|up|out|if|about|who|get|which|go|me|when|make|can|like|time|no|just|him|know|take|people|into|year|your|good|some|could|them|see|other|than|then|now|look|only|come|its|over|think|also|back|after|use|two|how|our|work|first|well|way|even|new|want|because|any|these|give|day|most|us)\b/g,
    arabic: /[\u0600-\u06FF]/g,
    dari: /[\u0600-\u06FF]/g,
  }

  let maxMatches = 0
  let detectedLang = "unknown"

  for (const [lang, pattern] of Object.entries(patterns)) {
    const matches = (sample.match(pattern) || []).length
    if (matches > maxMatches) {
      maxMatches = matches
      detectedLang = lang
    }
  }

  return maxMatches > 5 ? detectedLang : "auto-detect"
}

function cleanExtractedText(text: string): string {
  if (!text) return ""

  return (
    text
      // Remove excessive whitespace
      .replace(/\s+/g, " ")
      // Remove control characters but preserve line breaks
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      // Clean up multiple line breaks
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      // Trim whitespace
      .trim()
  )
}
