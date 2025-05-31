"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/Navbar"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  return (
    <>
      {/* <Navbar onCategoryChange={setSelectedCategory} /> */}
      {children}
    </>
  )
}
