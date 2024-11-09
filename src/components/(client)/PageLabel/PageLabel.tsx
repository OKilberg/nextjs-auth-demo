"use client";

import React from "react";
import { usePageLabel } from "./usePageLabel";

export default function PageLabel() {
  const pageLabel = usePageLabel();

  return <h1>{pageLabel}</h1>;
}
