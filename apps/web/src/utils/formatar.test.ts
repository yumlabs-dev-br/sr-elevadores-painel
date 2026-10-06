import { describe, expect, it } from "vitest";
import { andarCurto, porcento, relogio, segundos } from "./formatar.ts";

describe("formatar", () => {
  it("segundos e porcentagem em pt-BR (com — quando não há valor)", () => {
    expect(segundos(53.1)).toBe("53,1 s");
    expect(segundos(null)).toBe("—");
    expect(porcento(41.25)).toBe("41,3%");
  });

  it("relógio e andares", () => {
    expect(relogio(425)).toBe("07:05");
    expect(andarCurto(0)).toBe("T");
    expect(andarCurto(7)).toBe("7º");
  });
});
