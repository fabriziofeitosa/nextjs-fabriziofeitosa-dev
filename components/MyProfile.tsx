import Image from "next/image";
import Link from "next/link";
import AboutMe from "@/markdown/aboutMe.mdx";

function MyProfile() {
  return (
    <>
      <Image
        src="/photo.png"
        alt="Picture of the author"
        width={75}
        height={75}
      />
      <h1>
        <Link href="/">Fabrizio Feitosa</Link>
      </h1>
      <AboutMe />
    </>
  );
}

export default MyProfile;
