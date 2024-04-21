import { useState } from "react";

const Login = () => {
  const [UserState, setUserState] = useState("Sign Up");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const onSubmit = (e:any) => {
    e.preventDefault();
    console.log(email,password,name);
  }
  
  return (
    <form action="" className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm text-zinc-600 shadow-lg">
        <p className="text-2xl font-semibold">{UserState == "Sign Up" ? "Create Account" : "Login"}</p>
        <p className="">Please {UserState == "Sign Up" ? "Create Account" : "Login"} to book appointment.</p>
        {
          UserState == "Sign Up" && (
            <div className="w-full">
              <p className="">Full Name</p>
              <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" onChange={(e:any) => setName(e.target.value)} value={name} required/>
            </div>
          )
        }
        <div className="w-full">
          <p className="">Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" onChange={(e:any) => setEmail(e.target.value)} value={email}  required/>
        </div>
        <div className="w-full">
          <p className="">Password</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" onChange={(e:any) => setPassword(e.target.value)} value={password} required/>
        </div>
        <button className="w-full rounded bg-primary py-2 text-white text-base">{UserState == "Sign Up" ? "Create Account" : "Login"}</button>
        {UserState == "Sign Up" ? (
          <p className="text-xs">Already have an account? <span className="text-primary cursor-pointer" onClick={() => setUserState("Login")}>Login</span></p>
        ) : (
          <p className="text-xs">Don't have an account? <span className="text-primary cursor-pointer" onClick={() => setUserState("Sign Up")}>Sign Up</span></p>
        )  
        }
      </div>
    </form>
  )
}

export default Login