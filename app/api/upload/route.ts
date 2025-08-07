import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // For demo purposes, we'll simulate text extraction
    // In production, you'd use libraries like pdf-parse, mammoth, etc.

    let extractedText = ""

    if (file.type === "text/plain") {
      extractedText = await file.text()
    } else if (file.type === "application/pdf") {
      // Simulate PDF text extraction with sample Spanish legal document
      extractedText = `SOLICITUD DE ASILO

Información del Solicitante:
Nombre: María Elena Rodríguez García
Fecha de Nacimiento: 15 de marzo de 1985
País de Origen: Honduras
Número de Caso: A123456789

Declaración de la Solicitud:
Solicito asilo en los Estados Unidos basándome en la persecución que enfrenté en mi país de origen debido a mi opinión política y mi pertenencia a un grupo social particular. La persecución que sufrí incluye amenazas contra mi vida, detención sin el debido proceso, y discriminación sistemática por parte de las autoridades gubernamentales.

Temo regresar a mi país porque las condiciones que llevaron a mi persecución no han cambiado, y creo que enfrentaría amenazas continuas a mi seguridad y bienestar si fuera obligada a regresar.

Evidencia de Apoyo:
- Registros médicos que documentan lesiones por persecución
- Artículos de noticias sobre las condiciones en mi país de origen  
- Declaraciones de testigos de miembros de la familia
- Informes sobre condiciones del país de organizaciones de derechos humanos

Respetuosamente solicito que esta aplicación sea aprobada para que pueda permanecer en los Estados Unidos y reconstruir mi vida en seguridad.

Firma: _________________________
Fecha: ${new Date().toLocaleDateString("es-ES")}`
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      extractedText,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })
  } catch (error) {
    console.error("Upload processing error:", error)
    return NextResponse.json(
      {
        error: "Failed to process file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
