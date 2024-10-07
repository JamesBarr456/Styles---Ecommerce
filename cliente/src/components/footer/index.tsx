import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import Link from "next/link";
import { Logo } from "../logo/Logo";

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-4 gap-8">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo />
        </Link>
        <div className="grid gap-2  justify-items-center w-full">
          <h4 className="text-lg font-semibold">Páginas</h4>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Inicio
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Servicios
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Sobre Nosotros
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Contacto
          </Link>
        </div>
        <div className="grid gap-2 justify-items-center w-full">
          <h4 className="text-lg font-semibold">Contacto</h4>
          <p className="text-muted-foreground">Teléfono: +1 (555) 123-4567</p>
          <p className="text-muted-foreground">Email: info@acmeinc.com</p>
          <p className="text-muted-foreground">
            Dirección: 123 Main St, Anytown USA
          </p>
        </div>
        <div className="grid gap-2 justify-items-center">
          <h4 className="text-lg font-semibold">Redes Sociales</h4>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; 2024 Acme Inc. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="#" className="hover:underline" prefetch={false}>
            Términos de Servicio
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
