/* eslint no-use-before-define: 0 */
import * as functions from "firebase-functions";
import OpenAI from "openai";
// import {getStorage} from "firebase-admin/storage";
// import * as cors from "cors";

// const corsHandler = cors({origin: true});



// eslint-disable-next-line max-len
export const openAIHttpFunctionSec = functions.https.onCall(async (data, response) => {
  const quest = data.name;
  const openAPIResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": `${quest}`}],
    temperature: 0,
  });
  return {"data": openAPIResponse};
});
//  params?.query?.toString()
