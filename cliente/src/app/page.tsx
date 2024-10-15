import { Handshake, ShieldCheck, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-7 items-center container mx-auto">
      <Image
        width={600}
        height={400}
        className="object-fill object-center"
        alt="banner"
        src="https://www.dropbox.com/scl/fi/zaph5okixcbvccd4u9ht3/Sports-Sneakers-Template-Hecho-con-PosterMyWall.jpg?rlkey=jzuklt2oqyn06u1iittkbcecz&st=cinwp21l&raw=1"
      />

      <h2 className="font-bold text-xl text-blue uppercase">
        Nuestro Catálogo
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-evenly justify-items-center px-5 gap-3">
        {marcas.map((marca, i) => (
          <Image
            key={i}
            width={100}
            height={100}
            className="object-contain"
            alt="banner"
            src={marca}
          />
        ))}
      </div>

      <h2 className="font-bold text-xl text-blue uppercase">Lo más buscado</h2>

      <div className="w-full px-5 text-center">
        <Button
          asChild
          className="bg-orange-500  p-7 rounded-xl hover:bg-orange-600 text-white transition-colors"
        >
          <Link href="/products">Ver más productos</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-items-center lg:items-center">
        <Image
          width={400}
          height={400}
          className="object-cover"
          alt="home image"
          src="https://metropolitanhost.com/themes/templatemoster/html/shoez/assets/img/about-us/540x530.jpg"
        />
        <div className="flex flex-col gap-5 px-5">
          <h3 className="capitalize text-orange-500 font-bold">features</h3>
          <h1 className="font-bold text-3xl">Why Choose Us</h1>

          {features.map(
            ({ icon: Icon, title, subtitle, description }, index) => (
              <FeatureCard
                key={index}
                icon={<Icon size={30} />}
                title={title}
                subtitle={subtitle}
                description={description}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    icon: Handshake,
    title: "Trusted",
    subtitle: "Store",
    description: "More than one thousand people trusted on our store.",
  },
  {
    icon: Truck,
    title: "Free",
    subtitle: "Delivery",
    description: "We deliver our products free door to door 24x7=360",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    subtitle: "Payment Store",
    description: "Our payment system is secured from hacking.",
  },
];
const marcas = [
  "https://www.dropbox.com/scl/fi/kuut97qlikgbv2hiny4zz/adidass-150x150.png?rlkey=znic8u9t39niw82qv4vep2ql3&st=sqxofmea&raw=1",
  "https://www.dropbox.com/scl/fi/3jv3irfrdfrzze586uazw/nike-120-z-70.png?rlkey=5lkhqpv6rc0izdhjyckoro9yt&st=clcm5nt0&raw=1",
  "https://www.dropbox.com/scl/fi/7zjl8srrlhcgj8w37q5fv/vans-150x150.png?rlkey=3g50dn3vixv7s5l2vfuz0w4j3&st=678d5de8&raw=1",
  "https://www.dropbox.com/scl/fi/9j7dnn3tnd49oo1jtczkk/6-150x150.png?rlkey=lgzzfdjgp41ew5euxnr97aff3&st=0231uh6l&raw=1",
  "https://www.dropbox.com/scl/fi/3bl52tai95anym2erhufb/converse2-150x150.png?rlkey=h58lswc4rvlzaux60xzh9bvgg&st=ul04r6zx&raw=1",
  "https://www.dropbox.com/scl/fi/o67vffv91p14zn3zlttu8/LACOSTE-150x150.png?rlkey=jimcpl6uckh985429n27qm13b&st=r4wjwbxt&raw=1",
];
interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  description: string;
}
const FeatureCard = ({
  icon,
  title,
  subtitle,
  description,
}: FeatureCardProps) => (
  <div className="flex items-center gap-5">
    <div className="w-16 h-16 flex items-center justify-center border text-orange-500 border-orange-500 rounded-full shadow-orange-600 shadow-sm">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-bold mb-3">
        {title} <span className="font-light">{subtitle}</span>
      </h2>
      <p className="text-xs">{description}</p>
    </div>
  </div>
);
