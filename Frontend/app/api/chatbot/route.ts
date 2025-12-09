import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const response = await fetch("http://localhost:5678/webhook/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error("Error al conectar con N8N")
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("API chatbot error:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Error interno al contactar a N8N.",
            },
            { status: 500 },
        )
    }
}
