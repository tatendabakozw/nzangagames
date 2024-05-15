/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import CustomInput from "apps/landing-page/components/inputs/CustomInput";
import { apiUrl } from "apps/landing-page/utils/apiUrl";
import { getMessage } from "apps/landing-page/helpers/getMessage";
import Alert from "apps/landing-page/components/alerts/Alert";
import PrimaryButton from "apps/landing-page/components/buttons/PrimaryButton";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const register_user = async () => {
    setLoading(true);
    try {
      setErr("");
      const { data } = await axios.post(`${apiUrl}/api/auth/register`, {
        email,
        password,
        agreed,
      });
      console.log(data);
      setMsg(getMessage(data));
      router.push("/");
      setPassword("");
      setEmail("");
      setLoading(false);
      // console.log(data);
    } catch (error: any) {
      setErr(getMessage(error));
      setMsg("");
      console.error(getMessage(error));
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex-col grid py-8 items-start content-center bg-white">
      <p className="absolute md:text-start text-center top-10 text-primary-original text-4xl font-semibold left-10">
        Nzangagames
      </p>
      <div className="z-0 absolute top-20 left-24 md:w-96 w-60 md:h-96 h-60 bg-primary-superlight dark:bg-primary-dark rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" />
      <div className="z-0 absolute top-32 right-52 md:w-96 w-60 md:h-96 h-60 bg-secondary-superlight dark:bg-secondary-dark rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
      <div className="z-0 absolute bottom-8 right-96 md:w-96 w-60 md:h-96 h-60 bg-pink-200 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-3000" />
      <div className=" max-w-xs rounded-lg p-4 w-full mx-auto flex flex-col space-y-4 backdrop-blur-xl shadow">
        <div className="flex flex-col space-y-8">
          <p className="text-center text-slate-700 text-lg">Create account,</p>
          <p className="text-xs text-slate-700 text-center font-medium">
            Get started with Nzangagames
          </p>
        </div>
        <button className="flex flex-row items-center border content-center justify-center border-slate-300/50 w-full p-2 rounded-lg space-x-4">
          <FaGoogle />
          <p className="text-sm text-slate-700">Sign in with Google</p>
        </button>
        <div className="flex flex-row items-center space-x-2">
          <div className="border-t border-slate-300/50 flex-1" />
          <p>or</p>
          <div className="border-t border-slate-300/50 flex-1" />
        </div>
        <CustomInput
          type="email"
          placeholder="Email"
          value={email}
          setValue={(e: { target: { value: SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
        />
        <div className="flex flex-col space-y-2">
          <CustomInput
            type="password"
            placeholder="Password"
            value={password}
            setValue={(e: { target: { value: SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mr-2"
            />
            <label
              htmlFor="agreeCheckbox"
              className="text-xs text-slate-700 font-medium"
            >
              I agree to the Terms and Conditions
            </label>
          </div>
        </div>
        {err && <Alert message={err} type="error" />}
        {msg && <Alert message={msg} type="success" />}

        <PrimaryButton
          onClick={register_user}
          loading={loading}
          text="Register"
        />
        <div className="text-slate-700 flex flex-row items-center text-xs font-medium text-center">
          <p>So you have an account? </p>
          <Link href={"/"} className="text-primary-original">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
