import Image from "next/image";
import calzado from "../../../public/images/banner-register-login.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="relative">
        <Image
          src={calzado}
          alt="imagen de calzado"
          sizes="100vw"
          className="w-full h-96 object-cover object-bottom xl:h-[420px] xl:object-center"
        />
      </div>
      {children}
    </main>
  );
}