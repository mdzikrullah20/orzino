'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Lock,
  Mail,
  User,
  Phone,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot';

export default function AccountPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [submitted, setSubmitted] = useState(false);

  const switchMode = (newMode: AuthMode) => {
    setSubmitted(false);
    setMode(newMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F0EAE0] text-[#181410] select-none flex flex-col justify-between p-6 relative overflow-hidden">

      {/* Background Accent Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFC300]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="max-w-7xl w-full mx-auto flex items-center justify-between z-10">

        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-mono
            font-bold
            uppercase
            tracking-widest
            text-[#181410]
            hover:text-[#E8115B]
            transition-colors
          "
        >
          <ArrowLeft size={16} />
          Back To Shop
        </Link>


      </div>


      {/* =====================================================
          AUTH CONTAINER
      ===================================================== */}

      <div className="w-full max-w-md mx-auto my-auto py-8 z-10">

        <div
          className="
            bg-white/70
            backdrop-blur-xl
            rounded-[32px]
            p-8
            sm:p-10
            border
            border-[#D8CBBE]
            shadow-2xl
            relative
          "
        >

          {/* =================================================
              MODE SWITCHER
          ================================================= */}

          {mode !== 'forgot' && (
            <div
              className="
                grid
                grid-cols-2
                bg-[#181410]/5
                p-1.5
                rounded-full
                border
                border-[#D8CBBE]
                mb-8
              "
            >

              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#FFC300] text-[#181410] shadow-md'
                    : 'text-[#5F554C] hover:text-[#181410]'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => switchMode('register')}
                className={`py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#FFC300] text-[#181410] shadow-md'
                    : 'text-[#5F554C] hover:text-[#181410]'
                }`}
              >
                Register
              </button>

            </div>
          )}


          <AnimatePresence mode="wait">

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            {mode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >

                <div className="text-center mb-6">

                  <h2
                    style={{
                      fontFamily:
                        'var(--font-anton), Impact, sans-serif',
                    }}
                    className="
                      text-3xl
                      sm:text-4xl
                      uppercase
                      text-[#181410]
                      tracking-wide
                    "
                  >
                    WELCOME BACK
                  </h2>

                  <p className="text-xs text-[#5F554C] mt-1">
                    Sign in to track orders & earn crunch points.
                  </p>

                </div>


                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >

                  {/* Email */}

                  <div>

                    <label
                      className="
                        block
                        text-[11px]
                        font-mono
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#181410]
                        mb-1.5
                      "
                    >
                      Email Address
                    </label>

                    <div className="relative flex items-center">

                      <Mail
                        className="
                          absolute
                          left-4
                          w-4
                          h-4
                          text-[#5F554C]
                        "
                      />

                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="
                          w-full
                          bg-white/80
                          border
                          border-[#CFC2B5]
                          rounded-2xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-[#181410]
                          placeholder:text-[#8A8179]
                          focus:outline-none
                          focus:border-[#FFC300]
                          transition-colors
                        "
                      />

                    </div>

                  </div>


                  {/* Password */}

                  <div>

                    <div className="flex justify-between items-center mb-1.5">

                      <label
                        className="
                          block
                          text-[11px]
                          font-mono
                          font-bold
                          uppercase
                          tracking-wider
                          text-[#181410]
                        "
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        className="
                          text-[11px]
                          text-[#A66B00]
                          hover:text-[#E8115B]
                          hover:underline
                          font-mono
                          uppercase
                        "
                      >
                        Forgot Password?
                      </button>

                    </div>

                    <div className="relative flex items-center">

                      <Lock
                        className="
                          absolute
                          left-4
                          w-4
                          h-4
                          text-[#5F554C]
                        "
                      />

                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="
                          w-full
                          bg-white/80
                          border
                          border-[#CFC2B5]
                          rounded-2xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-[#181410]
                          placeholder:text-[#8A8179]
                          focus:outline-none
                          focus:border-[#FFC300]
                          transition-colors
                        "
                      />

                    </div>

                  </div>


                  {/* Sign In Button */}

                  <button
                    type="submit"
                    className="
                      w-full
                      bg-[#FFC300]
                      hover:bg-yellow-400
                      text-[#181410]
                      py-4
                      rounded-full
                      font-black
                      text-xs
                      uppercase
                      tracking-widest
                      shadow-xl
                      transition-all
                      hover:scale-[1.02]
                      mt-2
                      cursor-pointer
                    "
                  >
                    SIGN IN
                  </button>

                </form>

              </motion.div>
            )}


            {/* =================================================
                REGISTER FORM
            ================================================= */}

            {mode === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >

                <div className="text-center mb-6">

                  <h2
                    style={{
                      fontFamily:
                        'var(--font-anton), Impact, sans-serif',
                    }}
                    className="
                      text-3xl
                      sm:text-4xl
                      uppercase
                      text-[#181410]
                      tracking-wide
                    "
                  >
                    JOIN ORZINO FAM
                  </h2>

                  <p className="text-xs text-[#5F554C] mt-1">
                    Create an account for quick checkouts & secret drops.
                  </p>

                </div>


                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >

                  {/* Full Name */}

                  <div>

                    <label
                      className="
                        block
                        text-[11px]
                        font-mono
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#181410]
                        mb-1.5
                      "
                    >
                      Full Name
                    </label>

                    <div className="relative flex items-center">

                      <User
                        className="
                          absolute
                          left-4
                          w-4
                          h-4
                          text-[#5F554C]
                        "
                      />

                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="
                          w-full
                          bg-white/80
                          border
                          border-[#CFC2B5]
                          rounded-2xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-[#181410]
                          placeholder:text-[#8A8179]
                          focus:outline-none
                          focus:border-[#FFC300]
                          transition-colors
                        "
                      />

                    </div>

                  </div>


                  {/* Phone */}

                  <div>

                    <label
                      className="
                        block
                        text-[11px]
                        font-mono
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#181410]
                        mb-1.5
                      "
                    >
                      Phone Number
                    </label>

                    <div className="relative flex items-center">

                      <Phone
                        className="
                          absolute
                          left-4
                          w-4
                          h-4
                          text-[#5F554C]
                        "
                      />

                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="
                          w-full
                          bg-white/80
                          border
                          border-[#CFC2B5]
                          rounded-2xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-[#181410]
                          placeholder:text-[#8A8179]
                          focus:outline-none
                          focus:border-[#FFC300]
                          transition-colors
                        "
                      />

                    </div>

                  </div>


                  {/* Email */}

                  <div>

                    <label
                      className="
                        block
                        text-[11px]
                        font-mono
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#181410]
                        mb-1.5
                      "
                    >
                      Email Address
                    </label>

                    <div className="relative flex items-center">

                      <Mail
                        className="
                          absolute
                          left-4
                          w-4
                          h-4
                          text-[#5F554C]
                        "
                      />

                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="
                          w-full
                          bg-white/80
                          border
                          border-[#CFC2B5]
                          rounded-2xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-[#181410]
                          placeholder:text-[#8A8179]
                          focus:outline-none
                          focus:border-[#FFC300]
                          transition-colors
                        "
                      />

                    </div>

                  </div>


                  {/* Password */}

                  <div>

                    <label
                      className="
                        block
                        text-[11px]
                        font-mono
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#181410]
                        mb-1.5
                      "
                    >
                      Password
                    </label>

                    <div className="relative flex items-center">

                      <Lock
                        className="
                          absolute
                          left-4
                          w-4
                          h-4
                          text-[#5F554C]
                        "
                      />

                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="
                          w-full
                          bg-white/80
                          border
                          border-[#CFC2B5]
                          rounded-2xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-[#181410]
                          placeholder:text-[#8A8179]
                          focus:outline-none
                          focus:border-[#FFC300]
                          transition-colors
                        "
                      />

                    </div>

                  </div>


                  {/* Create Account */}

                  <button
                    type="submit"
                    className="
                      w-full
                      bg-[#FFC300]
                      hover:bg-yellow-400
                      text-[#181410]
                      py-4
                      rounded-full
                      font-black
                      text-xs
                      uppercase
                      tracking-widest
                      shadow-xl
                      transition-all
                      hover:scale-[1.02]
                      mt-2
                      cursor-pointer
                    "
                  >
                    CREATE ACCOUNT
                  </button>

                </form>

              </motion.div>
            )}


            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            {mode === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >

                {!submitted ? (
                  <>

                    <div className="text-center mb-6">

                      <div
                        className="
                          w-12
                          h-12
                          bg-[#FFC300]/10
                          text-[#A66B00]
                          border
                          border-[#FFC300]/30
                          rounded-full
                          flex
                          items-center
                          justify-center
                          mx-auto
                          mb-3
                        "
                      >
                        <KeyRound size={22} />
                      </div>

                      <h2
                        style={{
                          fontFamily:
                            'var(--font-anton), Impact, sans-serif',
                        }}
                        className="
                          text-3xl
                          uppercase
                          text-[#181410]
                          tracking-wide
                        "
                      >
                        RESET PASSWORD
                      </h2>

                      <p className="text-xs text-[#5F554C] mt-1">
                        Enter your registered email and we'll send reset
                        instructions.
                      </p>

                    </div>


                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >

                      {/* Email */}

                      <div>

                        <label
                          className="
                            block
                            text-[11px]
                            font-mono
                            font-bold
                            uppercase
                            tracking-wider
                            text-[#181410]
                            mb-1.5
                          "
                        >
                          Email Address
                        </label>

                        <div className="relative flex items-center">

                          <Mail
                            className="
                              absolute
                              left-4
                              w-4
                              h-4
                              text-[#5F554C]
                            "
                          />

                          <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            className="
                              w-full
                              bg-white/80
                              border
                              border-[#CFC2B5]
                              rounded-2xl
                              py-3.5
                              pl-11
                              pr-4
                              text-sm
                              text-[#181410]
                              placeholder:text-[#8A8179]
                              focus:outline-none
                              focus:border-[#FFC300]
                              transition-colors
                            "
                          />

                        </div>

                      </div>


                      {/* Send Reset */}

                      <button
                        type="submit"
                        className="
                          w-full
                          bg-[#FFC300]
                          hover:bg-yellow-400
                          text-[#181410]
                          py-4
                          rounded-full
                          font-black
                          text-xs
                          uppercase
                          tracking-widest
                          shadow-xl
                          transition-all
                          hover:scale-[1.02]
                          cursor-pointer
                        "
                      >
                        SEND RESET LINK
                      </button>


                      {/* Back */}

                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className="
                          w-full
                          text-center
                          text-xs
                          font-mono
                          font-bold
                          text-[#5F554C]
                          hover:text-[#181410]
                          uppercase
                          tracking-wider
                          pt-2
                          block
                          cursor-pointer
                        "
                      >
                        Back to Login
                      </button>

                    </form>

                  </>
                ) : (

                  /* =================================================
                     RESET SUCCESS
                  ================================================= */

                  <div className="text-center py-4">

                    <CheckCircle2
                      size={48}
                      className="
                        text-emerald-600
                        mx-auto
                        mb-3
                      "
                    />

                    <h3
                      className="
                        text-xl
                        font-bold
                        uppercase
                        text-[#181410]
                        mb-2
                      "
                    >
                      LINK SENT!
                    </h3>

                    <p
                      className="
                        text-xs
                        text-[#5F554C]
                        leading-relaxed
                        mb-6
                      "
                    >
                      We sent a password reset link to your email if an
                      account exists under that address.
                    </p>

                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="
                        bg-[#FFC300]
                        hover:bg-yellow-400
                        text-[#181410]
                        px-8
                        py-3
                        rounded-full
                        font-black
                        text-xs
                        uppercase
                        tracking-widest
                        cursor-pointer
                        transition-all
                        hover:scale-105
                      "
                    >
                      RETURN TO SIGN IN
                    </button>

                  </div>

                )}

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          text-center
          text-xs
          text-[#6B625A]
          font-mono
          z-10
        "
      >
        © {new Date().getFullYear()} ORZINO SNACKS.
        ALL RIGHTS RESERVED.
      </div>

    </div>
  );
}