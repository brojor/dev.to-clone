import { get } from "@vueuse/core";
import type { Ref } from "vue";

function getCurrentRow({ textContent, selectionStart, selectionEnd }) {
  const startIndex =
    textContent.indexOf("\n") === -1
      ? 0
      : textContent.slice(0, selectionStart).lastIndexOf("\n");
  return textContent.slice(startIndex, selectionEnd);
}

const addPairSign = (textarea: HTMLTextAreaElement, sign: string) => {
  const { selectionStart, selectionEnd, value } = textarea;

  const firstPart = value.slice(0, selectionStart);
  const middlePart = value.slice(selectionStart, selectionEnd);
  const lastPart = value.slice(selectionEnd);

  textarea.value = `${firstPart}${sign}${middlePart}${sign}${lastPart}`;

  textarea.selectionStart = selectionStart + sign.length;
  textarea.selectionEnd = selectionEnd + sign.length;
};
const removePairSign = (textarea: HTMLTextAreaElement, sign: string) => {
  const { selectionStart, selectionEnd, value } = textarea;

  const firstPart = value.slice(0, selectionStart - sign.length);
  const middlePart = value.slice(selectionStart, selectionEnd);
  const lastPart = value.slice(selectionEnd + sign.length);

  textarea.value = `${firstPart}${middlePart}${lastPart}`;

  textarea.selectionStart = selectionStart - sign.length;
  textarea.selectionEnd = selectionEnd - sign.length;
};

const makeList = (items: string[], { ordered }: { ordered: boolean }) => {
  return items
    .reduce((str, item, index) => {
      const symbol = ordered ? `${index + 1}.` : "-";
      return str + `${symbol} ${item}\n`;
    }, "")
    .slice(0, -1);
};

export default function useToolbar(target: Ref<HTMLTextAreaElement>) {
  const togglePairSign = (sign: string) => {
    if (target.value) {
      console.log("není null");
      const { selectionStart, selectionEnd, value: textContent } = target.value;

      const before = textContent.slice(
        selectionStart - sign.length,
        selectionStart
      );
      const after = textContent.slice(selectionEnd, selectionEnd + sign.length);

      if (before === after && after === sign) {
        removePairSign(target.value, sign);
      } else {
        addPairSign(target.value, sign);
      }
      target.value.focus();
    }
  };

  const toogleList = ({ ordered }: { ordered: boolean }) => {
    const sign = ordered ? "1. " : "- ";
    if (target.value) {
      const { selectionStart, selectionEnd, value: textContent } = target.value;
      const firstPart = textContent.slice(0, selectionStart);
      const middlePart = textContent.slice(selectionStart, selectionEnd);
      const lastPart = textContent.slice(selectionEnd);

      if (selectionStart === selectionEnd) {
        const alreadyExist =
          textContent.slice(selectionStart - sign.length, selectionStart) ===
          sign;

        if (alreadyExist) {
          target.value.value = `${firstPart.slice(0, -sign.length)}${lastPart}`;
          target.value.selectionStart = selectionStart - sign.length;
          target.value.selectionEnd = selectionStart - sign.length;
        } else {
          const newlineBefore =
            textContent.charAt(selectionStart - 1) === "\n" ||
            selectionStart === 0
              ? ""
              : "\n\n";
          const newlineAfter =
            textContent.charAt(selectionStart) === "\n" || selectionStart === 0
              ? ""
              : "\n";

          target.value.value = `${firstPart}${newlineBefore}${sign}${newlineAfter}${lastPart}`;
          const offset = newlineBefore ? sign.length + 2 : sign.length;
          target.value.selectionStart = selectionStart + offset;
          target.value.selectionEnd = selectionStart + offset;
        }
      } else {
        const regex = ordered ? /\d. /g : /- /g;
        const alreadyExist = regex.test(
          textContent.slice(selectionStart, selectionEnd)
        );
        const items = middlePart.split("\n");
        const offset = items.length * sign.length;
        if (alreadyExist) {
          const result = middlePart.replace(regex, "");
          target.value.value = `${firstPart}${result}${lastPart}`;
          target.value.selectionEnd = selectionEnd - offset;
        } else {
          const list = makeList(items, { ordered });
          target.value.value = `${firstPart}${list}${lastPart}`;
          target.value.selectionEnd = selectionEnd + offset;
        }
        target.value.selectionStart = selectionStart;
      }
      target.value.focus();
    }
  };

  const toggleUrl = () => {
    if (target.value) {
      const { selectionStart, selectionEnd, value: textContent } = target.value;
      const alreadyExist =
        textContent.substring(selectionStart - 2, selectionStart) === "](" &&
        textContent.charAt(selectionEnd) === ")";

      if (alreadyExist) {
        const beforeSelection = textContent.slice(0, selectionStart);

        const startIndex = beforeSelection.lastIndexOf("[");
        const endIndex = beforeSelection.lastIndexOf("]");
        const urlName = beforeSelection.substring(startIndex + 1, endIndex);

        const firstPart = textContent.slice(0, startIndex);
        const lastPart = textContent.slice(selectionEnd + 1);

        target.value.value = `${firstPart}${urlName}${lastPart}`;

        target.value.selectionStart = startIndex;
        target.value.selectionEnd = startIndex + urlName.length;
      } else {
        const firstPart = textContent.slice(0, selectionStart);
        const middlePart = textContent.slice(selectionStart, selectionEnd);
        const lastPart = textContent.slice(selectionEnd);
        target.value.value = `${firstPart}[${middlePart}](url)${lastPart}`;
        target.value.selectionStart = selectionEnd + 3;
        target.value.selectionEnd = selectionEnd + 6;
      }
      target.value.focus();
    }
  };
  const toggleHeading = () => {
    const { selectionStart, selectionEnd, value: textContent } = target.value;

    const currentRow = getCurrentRow({
      textContent,
      selectionStart,
      selectionEnd,
    });

    function isHashOnRow() {
      return /#{1,5}/.test(currentRow);
    }

    if (isHashOnRow()) {
      const { 0: sign } = currentRow.match(/#{1,5}/);
      if (sign.length === 4) {
        target.value.value = currentRow.replace(`${sign} `, "");
        target.value.setSelectionRange(
          selectionStart - (sign.length + 1),
          selectionEnd - (sign.length + 1)
        );
      } else {
        const after = currentRow.slice(selectionStart);
        target.value.value = `${"#".repeat(sign.length + 1)} ${after}`;
        target.value.setSelectionRange(selectionStart + 1, selectionEnd + 1);
      }
    } else {
      const beforeCursor = textContent.slice(0, selectionStart);
      const afterCursor = textContent.slice(selectionStart);
      const isOnStart = selectionStart === 0;
      const offset = isOnStart ? "" : "\n\n";
      target.value.value = `${beforeCursor}${offset}## ${afterCursor}`;
      target.value.setSelectionRange(
        selectionStart + 3 + offset.length,
        selectionEnd + 3 + offset.length
      );
    }
    target.value.focus();
  };

  const toggleQuote = () => {
    let { selectionStart, selectionEnd, value: textContent } = target.value;

    let { currentRow, beforeCurrentRow, afterCurrentRow } = splitContent({
      textContent,
      selectionStart,
      selectionEnd,
    });
    const sign = "> ";

    const signExistOnRow = /^> /m.test(currentRow);

    if (signExistOnRow) {
      currentRow = currentRow.replace(sign, "");
      selectionStart -= sign.length;
      selectionEnd -= sign.length;
    } else {
      const isOnStart = selectionStart === 0;
      const isAfterNewLine = textContent.charAt(selectionStart - 1) === "\n";
      const offset = isOnStart || isAfterNewLine ? "" : "\n\n";

      currentRow = `${currentRow}${offset}${sign}`;
      selectionStart += sign.length + offset.length;
      selectionEnd += sign.length + offset.length;
    }
    target.value.value = `${beforeCurrentRow}${currentRow}${afterCurrentRow}`;
    target.value.setSelectionRange(selectionStart, selectionEnd);
    target.value.focus();
  };

  return {
    togglePairSign,
    toogleList,
    toggleUrl,
    toggleHeading,
    toggleQuote,
  };
}

function splitContent({
  textContent,
  selectionStart,
  selectionEnd,
}: {
  textContent: string;
  selectionStart: number;
  selectionEnd: number;
}) {
  const startIndex =
    textContent.indexOf("\n") === -1
      ? 0
      : textContent.slice(0, selectionStart).lastIndexOf("\n");
  const currentRow = textContent.slice(startIndex, selectionEnd);
  const beforeCurrentRow = textContent.slice(0, startIndex);
  const afterCurrentRow = textContent.slice(selectionEnd);

  return {
    currentRow,
    beforeCurrentRow,
    afterCurrentRow,
  };
}
