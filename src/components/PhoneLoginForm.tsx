import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { env } from "@/lib/env";
import { useAuthStore } from "@/lib/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const sendSchema = z.object({
  phone: z.string().min(8, "Enter a valid phone number"),
});
type SendValues = z.infer<typeof sendSchema>;

const verifySchema = z.object({
  code: z.string().min(4, "Enter the OTP"),
});
type VerifyValues = z.infer<typeof verifySchema>;

export default function PhoneLoginForm() {
  const [step, setStep] = useState<"send" | "verify">("send");
  const [phone, setPhone] = useState<string>("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const sendForm = useForm<SendValues>({ resolver: zodResolver(sendSchema), defaultValues: { phone: "" } });
  const verifyForm = useForm<VerifyValues>({ resolver: zodResolver(verifySchema), defaultValues: { code: "" } });

  async function onSend(values: SendValues) {
    try {
      if (env.MOCK_AUTH) {
        setPhone(values.phone);
        setRequestId("mock-req-1");
        setStep("verify");
        toast.success("OTP sent to WhatsApp (mock: 123456)");
        return;
      }
      const res = await api.post("/api/auth/otp/send", { phone: values.phone });
      setPhone(values.phone);
      setRequestId(res.data.requestId);
      setStep("verify");
      toast.success("OTP sent to WhatsApp");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Failed to send OTP");
    }
  }

  async function onVerify(values: VerifyValues) {
    try {
      if (env.MOCK_AUTH) {
        if (values.code !== "123456") {
          toast.error("Invalid mock OTP. Use 123456.");
          return;
        }
        setAuth({
          user: { id: "1", name: "Fixlab User", phone },
          accessToken: "mock-token",
        });
        toast.success("Signed in");
        navigate("/", { replace: true });
        return;
      }
      const res = await api.post("/api/auth/otp/verify", {
        phone,
        code: values.code,
        requestId,
      });
      setAuth({ user: res.data.user, accessToken: res.data.accessToken ?? null });
      toast.success("Signed in");
      navigate("/", { replace: true });
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Failed to verify OTP");
    }
  }

  return (
    <div className="space-y-4">
      {step === "send" && (
        <form
          className="space-y-3"
          onSubmit={sendForm.handleSubmit(onSend)}
        >
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">WhatsApp number</Label>
            <PhoneInput
              id="phone"
              placeholder="+91 98765 43210"
              defaultCountry="IN"
              value={sendForm.watch("phone")}
              onChange={(v) => sendForm.setValue("phone", v ?? "", { shouldValidate: true })}
              className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
            />
            {sendForm.formState.errors.phone && (
              <p className="text-xs text-red-400">{sendForm.formState.errors.phone.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">Send OTP</Button>
        </form>
      )}

      {step === "verify" && (
        <form
          className="space-y-3"
          onSubmit={verifyForm.handleSubmit(onVerify)}
        >
          <div className="space-y-1">
            <Label className="text-white">Number</Label>
            <div className="text-sm text-white/80">{phone}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="code" className="text-white">Enter OTP</Label>
            <input
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
              {...verifyForm.register("code")}
            />
            {verifyForm.formState.errors.code && (
              <p className="text-xs text-red-400">{verifyForm.formState.errors.code.message}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit" className="flex-1">Verify & Sign in</Button>
            <Button type="button" variant="secondary" onClick={() => setStep("send")}>Change number</Button>
          </div>
        </form>
      )}
    </div>
  );
}
