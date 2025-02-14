import {findNode, processNode, makeDocumentVisible} from 'utils/common';
import {setFileInputData, initSearch, sendReceipt} from 'utils/engines';

const engine = 'ikea';

async function search({session, search, image, storageIds}) {
  // go to regional site
  processNode(
    '.region-picker a[data-cy="go-to-website"], .new-region-picker a[data-cy="go-to-website"]',
    node => node.click(),
    {throwError: false}
  );

  (await findNode('#search-box__visualsearch')).click();

  const inputSelector = 'input[type=file]';
  const input = await findNode(inputSelector);

  await setFileInputData(inputSelector, input, image);

  await sendReceipt(storageIds);

  input.dispatchEvent(new Event('change'));
}

function init() {
  makeDocumentVisible();
  initSearch(search, engine, taskId);
}

init();
