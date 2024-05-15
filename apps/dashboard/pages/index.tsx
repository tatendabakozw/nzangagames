/* eslint-disable @typescript-eslint/no-explicit-any */
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { apiUrl } from "@utils/apiUrl";
import { getMessage } from "@helpers/getMessage";
import Alert from "@components/alerts/Alert";
import { Store } from "@context/Store";
import { ContextType } from "@utils/types";

export function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { dispatch } = useContext<ContextType>(Store);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const login_user = async () => {
    setLoading(true);
    try {
      // const { data } = await axios.post(`${apiUrl}/api/auth/login`, {
      //   email,
      //   password,
      // });
      // console.log(data);
      // dispatch({ type: "USER_LOGIN", payload: data.user });
      // setMsg(getMessage(data));
      router.push("/overview");
      setPassword("");
      setEmail("");
      setLoading(false);
    } catch (error: any) {
      setErr(getMessage(error));
      setMsg("");
      console.error(getMessage(error));
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex-col grid py-8 items-start content-center bg-white">
      <p className="absolute md:text-start text-center top-10 text-zinc-900 text-4xl font-semibold left-10">
        Nzanga <span className="text-primary-original">Games</span>
      </p>
      {/* <div className="z-0 absolute top-20 left-24 md:w-96 w-60 md:h-96 h-60 bg-primary-superlight dark:bg-primary-dark rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" /> */}
      {/* <div className="z-0 absolute top-32 right-52 md:w-96 w-60 md:h-96 h-60 bg-secondary-superlight dark:bg-secondary-dark rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" /> */}
      <div className="z-0 absolute bottom-8 right-96 md:w-96 w-60 md:h-96 h-60 bg-pink-200 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-3000" />
      <div className=" max-w-xs rounded-lg p-4 w-full mx-auto flex flex-col space-y-4 backdrop-blur-xl shadow">
        <div className="flex flex-col space-y-8">
          <p className="text-center text-slate-700 text-lg">Almost there,</p>
          <p className="text-xs text-slate-700 text-center font-medium">
            Sign in to access your account or get started
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300/50 backdrop-blur-xl rounded-lg p-2 outline-none text-sm"
          placeholder="Email"
        />
        <div className="flex flex-col space-y-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300/50 backdrop-blur-xl rounded-lg p-2 outline-none text-sm"
            placeholder="Password"
          />
          <p className="text-end text-xs font-medium text-primary-original">
            Forgot Password?
          </p>
        </div>
        {err && <Alert message={err} type="error" />}
        {msg && <Alert message={msg} type="success" />}
        <PrimaryButton onClick={login_user} loading={loading} text="Log In" />
        <div className="text-slate-700 flex flex-row items-center text-xs font-medium text-center">
          <p>Don&apos;t have an account? </p>
          <Link href={"/register"} className="text-primary-original pl-1">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
