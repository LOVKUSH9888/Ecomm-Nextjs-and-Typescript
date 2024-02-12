"use client";

import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import Password from "antd/es/input/Password";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserType {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  //Hooks / vaiables
  const [loading, setLoading] = React.useState(false);

  //Router instance
  const router = useRouter();
  // Function definition
  const onFinish = async (values: UserType) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/login", values);
      message.success("Login successful");
      //Pushing to the Home page now
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Return
  return (
    <div className="grid grid-cols-none justify-center text-center">
      <h1>Login Form</h1>
      <Form
        className="w-[400px] flex flex-col gap-5 outline outline-offset-2 outline-pink-500 m-5 p-5 rounded"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please Enter the Email" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please Enter the Password" }]}
        >
          <Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>

        <Link href="/auth/register" className="text-black">
          Not a member Please! Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
