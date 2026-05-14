declare module "opentype.js" {
  type GlyphPath = {
    toPathData(decimalPlaces?: number): string
  }

  type Glyph = {
    advanceWidth?: number
    getPath(x: number, y: number, fontSize: number): GlyphPath
  }

  export type Font = {
    unitsPerEm: number
    charToGlyph(character: string): Glyph
  }

  export function parse(buffer: ArrayBuffer): Font
}
