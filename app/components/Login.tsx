import { useActionData, useSearchParams } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/server-runtime";
import { Action } from "history";
import { db } from "../utils/db.server";

function validateName(name: unknown) {
  if (typeof name !== "string" || (name !== "jin" && name !== "sammie")) {
    return "clown should be either jin or sammie";
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters long";
  }
}

function validateUrl(url: any) {
  console.log(url);
  let urls = ["/", "/joke/new"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    name: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const name = form.get("name");
  const password = form.get("password");
  const redirectTo = validateUrl(form.get("redirectTo") || "/");

  if (
    typeof loginType !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: "Form not submitted correctly idiot",
    });
  }

  const fields = { loginType, name, password };
  const fieldErrors = {
    name: validateName(name),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case "login": {
      // login to get the user
      // if there's no user, return the fields and a formError
      // if there is a user, create their session and redirect to /
      return badRequest({
        fields,
        formError: "Not implemented",
      });
    }
    case "register": {
      const clownExists = await db.clown.findFirst({
        where: { name },
      });
      if (clownExists) {
        return badRequest({
          fields,
          formError: `You already registered idiot stop clownin around`,
        });
      }
      // create the user
      // create their session and redirect to /
      return badRequest({
        fields,
        formError: "Not implemented",
      });
    }
    default: {
      return badRequest({
        fields,
        formError: "wtf did you do you broke it idiot",
      });
    }
  }
};

export const Login = () => {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <form className="flex flex-col items-center" method="post">
      <h2 className="text-lg mb-4">Prove your clownery</h2>
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get("redirectTo") ?? undefined}
      />
      <fieldset className="mb-4">
        <legend className="sr-only">Login or Register?</legend>
        <label className="mr-4">
          <input
            type="radio"
            name="loginType"
            value="login"
            defaultChecked={
              !actionData?.fields?.loginType ||
              actionData?.fields?.loginType === "login"
            }
          />{" "}
          Login
        </label>
        <label>
          <input
            type="radio"
            name="loginType"
            value="register"
            defaultChecked={actionData?.fields?.loginType === "register"}
          />{" "}
          Register
        </label>
      </fieldset>
      <label>
        <h3>Name</h3>
        <input
          name="name"
          className="bg-gray-200 mt-2 mb-4 py-2 px-4 rounded-md outline-none focus:border-red-200 border-4"
          placeholder="Who are you"
          type="text"
          defaultValue={actionData?.fields?.name}
          aria-invalid={Boolean(actionData?.fieldErrors?.name)}
          aria-errormessage={
            actionData?.fieldErrors?.name ? "name-error" : undefined
          }
        />
        {actionData?.fieldErrors?.name ? (
          <p className="text-red-400" role="alert" id="name-error">
            {actionData.fieldErrors.name}
          </p>
        ) : null}
      </label>
      <label>
        <h3>Password</h3>
        <input
          name="password"
          className="bg-gray-200 mt-2 mb-4 py-2 px-4 rounded-md outline-none focus:border-red-200 border-4"
          placeholder="********"
          type="text"
          defaultValue={actionData?.fields?.password}
          aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined}
          aria-errormessage={
            actionData?.fieldErrors?.password ? "password-error" : undefined
          }
        />
        {actionData?.fieldErrors?.password ? (
          <p className="form-validation-error" role="alert" id="password-error">
            {actionData.fieldErrors.password}
          </p>
        ) : null}
      </label>
      <button className="bg-red-400 mt-2 py-2 px-10 rounded-md text-white text-center block">
        🚀 Submit
      </button>
    </form>
  );
};
