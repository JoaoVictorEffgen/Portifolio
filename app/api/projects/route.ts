import { NextResponse } from "next/server"

import { getGithubData } from "@/lib/github"

export const revalidate = 300

export async function GET() {
  const data = await getGithubData()
  const status = data.error ? 502 : 200
  return NextResponse.json(data, { status })
}
