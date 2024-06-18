import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import path from "path"

export function buildResolvers({paths}: BuildOptions): Configuration["resolve"] {
  return { extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@": paths.src,
      "@/modules": path.resolve(__dirname, paths.src, "modules")
    }
   }
}