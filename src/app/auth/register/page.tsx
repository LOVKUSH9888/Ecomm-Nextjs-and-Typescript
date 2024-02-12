"use client"
// Import necessary modules and packages
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import Password from "antd/es/input/Password"; // Consider using "import { Input } from 'antd';" and "import { Password } from 'antd';" directly
import Link from "next/link";
import axios from "axios";

// Now importing for the login route move
import { useRouter } from 'next/navigation'; // Correct the import path

// Define the user type
interface userType {
  name: string;
  email: string;
  password: string;
}

// Define the Register component
const Register: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values: userType) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/register", values);
      message.success("Registaration successful , please login to continue");
      router.push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Return the component JSX
  return (
    <div className="grid grid-cols-none justify-center text-center">
      <h1>Register Form</h1>
      <Form
        className="w-[400px] flex flex-col gap-5 outline outline-offset-2 outline-pink-500 m-5 p-5 rounded"
        layout="vertical"
        onFinish={onFinish}
      >
        {/* Form items */}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Password />
        </Form.Item>
        <Form.Item>
          {/* Submit button */}
          <Button type="primary" htmlType="submit" loading={loading} >
            Register
          </Button>
        </Form.Item>

        {/* Login link */}
        <Link href='/auth/login' className="text-black" >
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
};

// Export the component
export default Register;
