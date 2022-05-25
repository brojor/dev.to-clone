import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import NewPost from "../../views/NewPost.vue";

describe.skip("Bold text", () => {
  it("adds **** and places the cursor in the middle.", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="bold"]');

    await btn.trigger("click");

    expect(textarea.element.value).toBe("****");
    expect(textarea.element.selectionStart).toBe(2);
    expect(textarea.element.selectionEnd).toBe(2);
  });
  it("on second click removes ****", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="bold"]');

    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it("remove **** when is cursor between", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="bold"]');

    textarea.setValue("****");
    textarea.element.selectionStart = 2;
    textarea.element.selectionEnd = 2;
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it("wrap selected word with **", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="bold"]');

    textarea.setValue("a bold word");
    textarea.element.setSelectionRange(2, 6);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("a **bold** word");
    expect(textarea.element.selectionStart).toBe(4);
    expect(textarea.element.selectionEnd).toBe(8);
  });
  it("remove ** wraping when is clicked again", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="bold"]');

    textarea.setValue("a bold word");
    textarea.element.setSelectionRange(2, 6);
    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("a bold word");
    expect(textarea.element.selectionStart).toBe(2);
    expect(textarea.element.selectionEnd).toBe(6);
  });
  it("remove ** wraping", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="bold"]');

    textarea.setValue("a **bold** word");
    textarea.element.setSelectionRange(4, 8);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("a bold word");
    expect(textarea.element.selectionStart).toBe(2);
    expect(textarea.element.selectionEnd).toBe(6);
  });
});

describe.skip("Italic text", () => {
  it("textarea is empty - adds __ and places the cursor in the middle.", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="italic"]');

    await btn.trigger("click");

    expect(textarea.element.value).toBe("__");
    expect(textarea.element.selectionStart).toBe(1);
    expect(textarea.element.selectionEnd).toBe(1);
  });
  it('textarea is empty - on second click removes "__"', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="italic"]');

    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it("remove __ when is cursor between", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="italic"]');

    textarea.setValue("__");
    textarea.element.selectionStart = 1;
    textarea.element.selectionEnd = 1;
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it('wrap word with "_" when is selected', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="italic"]');

    textarea.setValue("a italic word");
    textarea.element.setSelectionRange(2, 8);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("a _italic_ word");
    expect(textarea.element.selectionStart).toBe(3);
    expect(textarea.element.selectionEnd).toBe(9);
  });
  it("remove _ wraping when is clicked again", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="italic"]');

    textarea.setValue("a italic word");
    textarea.element.setSelectionRange(2, 8);
    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("a italic word");
    expect(textarea.element.selectionStart).toBe(2);
    expect(textarea.element.selectionEnd).toBe(8);
  });
  it("remove _ wraping", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="italic"]');

    textarea.setValue("a _italic_ word");
    textarea.element.setSelectionRange(3, 9);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("a italic word");
    expect(textarea.element.selectionStart).toBe(2);
    expect(textarea.element.selectionEnd).toBe(8);
  });
});

describe.skip("Link", () => {
  it('textarea is empty - adds "[](url)" and select "url" word', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="link"]');

    await btn.trigger("click");

    expect(textarea.element.value).toBe("[](url)");
    expect(textarea.element.selectionStart).toBe(3);
    expect(textarea.element.selectionEnd).toBe(6);
  });
  it('on second click removes "[](url)"', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="link"]');

    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it('remove  "[](url)" when url word is selected', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="link"]');

    textarea.setValue("[](url)");
    textarea.element.setSelectionRange(3, 6);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it('wrap linkname with [] followed by "(url)"', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="link"]');

    textarea.setValue("linkname");
    textarea.element.setSelectionRange(0, 8);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("[linkname](url)");
    expect(textarea.element.selectionStart).toBe(11);
    expect(textarea.element.selectionEnd).toBe(14);
  });
  it('remove "[linkname](url)" when is btn clicked again', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="link"]');

    textarea.setValue("linkname");
    textarea.element.setSelectionRange(0, 8);
    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("linkname");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(8);
  });
  it('remove "[linkname](url)" when is url selected', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="link"]');

    textarea.setValue("[linkname](url)");
    textarea.element.setSelectionRange(11, 14);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("linkname");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(8);
  });
});

describe.skip("Ordered list", () => {
  it('textarea is empty - adds "1. "', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ol"]');

    await btn.trigger("click");

    expect(textarea.element.value).toBe("1. ");
    expect(textarea.element.selectionStart).toBe(3);
    expect(textarea.element.selectionEnd).toBe(3);
  });
  it('on second click removes "1. "', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ol"]');

    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(0);
  });
  it("If it is pressed after a word - lines out before inserting a digit", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ol"]');

    textarea.setValue("word");
    textarea.element.setSelectionRange(5, 5);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("word\n\n1. \n");
    expect(textarea.element.selectionStart).toBe(9);
    expect(textarea.element.selectionEnd).toBe(9);
  });
  it("If pressed between words - skips a line, inserts a digit and inserts a new line before the next word", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ol"]');

    textarea.setValue("first second");
    textarea.element.setSelectionRange(6, 6);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("first \n\n1. \nsecond");
    // expect(textarea.element.selectionStart).toBe(10);
    // expect(textarea.element.selectionEnd).toBe(10);
  });
  it('on second click removes "1. " between words', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ol"]');

    textarea.setValue("first second");
    textarea.element.setSelectionRange(6, 6);
    await btn.trigger("click");
    await btn.trigger("click");

    expect(textarea.element.value).toBe("first \n\n\nsecond");
    expect(textarea.element.selectionStart).toBe(8);
    expect(textarea.element.selectionEnd).toBe(8);
  });
  it.skip('remove "[linkname](url)" when is url selected', async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ol"]');

    textarea.setValue("[linkname](url)");
    textarea.element.setSelectionRange(11, 14);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("linkname");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(8);
  });
});

describe.skip("unordered list", () => {
  it("paste indent between two words", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ul"]');

    textarea.setValue("foo bar");
    textarea.element.setSelectionRange(4, 4);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("foo \n\n- \nbar");
    expect(textarea.element.selectionStart).toBe(8);
    expect(textarea.element.selectionEnd).toBe(8);
  });

  it("removes the indent between two words", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ul"]');

    textarea.setValue("foo \n\n- \nbar");
    textarea.element.setSelectionRange(8, 8);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("foo \n\n\nbar");
    expect(textarea.element.selectionStart).toBe(6);
    expect(textarea.element.selectionEnd).toBe(6);
  });

  it("creates a unorded list from selected words separated by '\n'", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ul"]');

    textarea.setValue("foo\nbar\nbaz");
    textarea.element.setSelectionRange(0, 11);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("- foo\n- bar\n- baz");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(17);
  });

  it("remove indents from selected unordered list", async () => {
    const wrapper = mount(NewPost);
    const textarea = wrapper.get("textarea");
    const btn = wrapper.get('button[data-test="ul"]');

    textarea.setValue("- foo\n- bar\n- baz");
    textarea.element.setSelectionRange(0, 17);
    await btn.trigger("click");

    expect(textarea.element.value).toBe("foo\nbar\nbaz");
    expect(textarea.element.selectionStart).toBe(0);
    expect(textarea.element.selectionEnd).toBe(11);
  });
});
