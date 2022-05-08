import Layout from "~/components/Layout";
import { Clowntainer } from "~/components/Clowntainer";
import { ActionFunction, json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { requireClownId } from "~/utils/session.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    // name: string | undefined;
    content: string | undefined;
  };
  fields?: {
    // name: string;
    content: string;
  };
};

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return `Were you even trying? That joke is too short`;
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const clownId = await requireClownId(request);
  const form = await request.formData();
  const content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof content !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    // name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  const fields = { content };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const joke = await db.joke.create({ data: { ...fields, clownId } });
  return redirect(`/joke/${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <Layout>
      <Clowntainer>
        <form className="flex flex-col items-center" method="post">
          <h2 className="text-lg mb-4">Clown mode activated</h2>
          <label className="w-full">
            <textarea
              name="content"
              defaultValue={actionData?.fields?.content}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
              rows={8}
              placeholder="As if we need April to be fools"
              className="bg-gray-200 mt-2 mb-4 py-2 px-4 rounded-md w-full resize-none outline-none focus:border-red-200 border-4"
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p className="text-red-400" role="alert" id="content-error">
              {actionData.fieldErrors.content}
            </p>
          ) : null}
          <button
            type="submit"
            className="bg-red-400 mt-2 py-2 px-10 rounded-md text-white text-center block"
          >
            🚀 Submit
          </button>
        </form>
      </Clowntainer>
    </Layout>
  );
}
