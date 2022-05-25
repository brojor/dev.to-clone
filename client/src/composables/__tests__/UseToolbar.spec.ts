import { describe, it, expect } from "vitest";
import useToolbar from "../toolbar";
import { ref } from "vue";

const elRef = ref(document.createElement("textarea"));
const { togglePairSign, toggleHeading, toggleQuote } = useToolbar(elRef);

describe("bold", () => {
  it("adds **** and places the cursor in the middle.", async () => {
    elRef.value.value = "";
    elRef.value.setSelectionRange(0, 0);

    togglePairSign("**");

    expect(elRef.value.value).toBe("****");
    expect(elRef.value.selectionStart).toBe(2);
    expect(elRef.value.selectionEnd).toBe(2);
  });
  it("removes ****", async () => {
    elRef.value.value = "****";
    elRef.value.setSelectionRange(2, 2);

    togglePairSign("**");

    expect(elRef.value.value).toBe("");
    expect(elRef.value.selectionStart).toBe(0);
    expect(elRef.value.selectionEnd).toBe(0);
  });
  it("wrap selected word with **", async () => {
    elRef.value.value = "a bold word";
    elRef.value.setSelectionRange(2, 6);

    togglePairSign("**");

    expect(elRef.value.value).toBe("a **bold** word");
    expect(elRef.value.selectionStart).toBe(4);
    expect(elRef.value.selectionEnd).toBe(8);
  });
  it("remove ** wraping when is clicked again", async () => {
    elRef.value.value = "a **bold** word";
    elRef.value.setSelectionRange(4, 8);

    togglePairSign("**");

    expect(elRef.value.value).toBe("a bold word");
    expect(elRef.value.selectionStart).toBe(2);
    expect(elRef.value.selectionEnd).toBe(6);
  });
});

describe("headings (no selected text)", () => {
  it("add ## sign", () => {
    elRef.value.value = "";
    elRef.value.setSelectionRange(0, 0);

    toggleHeading();

    expect(elRef.value.value).toBe("## ");
    expect(elRef.value.selectionStart).toBe(3);
    expect(elRef.value.selectionEnd).toBe(3);
  });

  it("change ## to ###", () => {
    elRef.value.value = "## ";
    elRef.value.setSelectionRange(3, 3);

    toggleHeading();

    expect(elRef.value.value).toBe("### ");
    expect(elRef.value.selectionStart).toBe(4);
    expect(elRef.value.selectionEnd).toBe(4);
  });

  it("change ### to ####", () => {
    elRef.value.value = "### ";
    elRef.value.setSelectionRange(4, 4);

    toggleHeading();

    expect(elRef.value.value).toBe("#### ");
    expect(elRef.value.selectionStart).toBe(5);
    expect(elRef.value.selectionEnd).toBe(5);
  });

  it("when is heading sign 4 char length, remove signs", () => {
    elRef.value.value = "#### ";
    elRef.value.setSelectionRange(5, 5);

    toggleHeading();

    expect(elRef.value.value).toBe("");
    expect(elRef.value.selectionStart).toBe(0);
    expect(elRef.value.selectionEnd).toBe(0);
  });
});

describe("headings - selected text", () => {
  it("add ## before selected text", () => {
    elRef.value.value = "this is a heading";
    elRef.value.setSelectionRange(0, 17);

    toggleHeading();

    expect(elRef.value.value).toBe("## this is a heading");
    expect(elRef.value.selectionStart).toBe(3);
    expect(elRef.value.selectionEnd).toBe(20);
  });
  it("change ## to ###", () => {
    elRef.value.value = "## this is a heading";
    elRef.value.setSelectionRange(3, 20);

    toggleHeading();

    expect(elRef.value.value).toBe("### this is a heading");
    expect(elRef.value.selectionStart).toBe(4);
    expect(elRef.value.selectionEnd).toBe(21);
  });
  it("change ### to ####", () => {
    elRef.value.value = "### this is a heading";
    elRef.value.setSelectionRange(4, 21);

    toggleHeading();

    expect(elRef.value.value).toBe("#### this is a heading");
    expect(elRef.value.selectionStart).toBe(5);
    expect(elRef.value.selectionEnd).toBe(22);
  });
  it("remove ####", () => {
    elRef.value.value = "#### this is a heading";
    elRef.value.setSelectionRange(5, 22);

    toggleHeading();

    expect(elRef.value.value).toBe("this is a heading");
    expect(elRef.value.selectionStart).toBe(0);
    expect(elRef.value.selectionEnd).toBe(17);
  });

  it("paste 2x newline when is text before cursor", () => {
    elRef.value.value = "text";
    elRef.value.setSelectionRange(4, 4);

    toggleHeading();

    expect(elRef.value.value).toBe("text\n\n## ");
    expect(elRef.value.selectionStart).toBe(9);
    expect(elRef.value.selectionEnd).toBe(9);
  });
});

describe("quote", () => {
  it("add > sign", () => {
    elRef.value.value = "";
    elRef.value.setSelectionRange(0, 0);

    toggleQuote();

    expect(elRef.value.value).toBe("> ");
    expect(elRef.value.selectionStart).toBe(2);
    expect(elRef.value.selectionEnd).toBe(2);
  });
  it("remove > sign", () => {
    elRef.value.value = "> ";
    elRef.value.setSelectionRange(2, 2);

    toggleQuote();

    expect(elRef.value.value).toBe("");
    expect(elRef.value.selectionStart).toBe(0);
    expect(elRef.value.selectionEnd).toBe(0);
  });
  it("add 2x newline and > sign if is text before cursor", () => {
    elRef.value.value = "text";
    elRef.value.setSelectionRange(4, 4);

    toggleQuote();

    expect(elRef.value.value).toBe("text\n\n> ");
    expect(elRef.value.selectionStart).toBe(8);
    expect(elRef.value.selectionEnd).toBe(8);
  });
  it("add > sign between rows", () => {
    elRef.value.value = "row1\n\n> \nrow3";
    elRef.value.setSelectionRange(8, 8);

    toggleQuote();

    expect(elRef.value.value).toBe("row1\n\n\nrow3");
    expect(elRef.value.selectionStart).toBe(6);
    expect(elRef.value.selectionEnd).toBe(6);
  });
});
