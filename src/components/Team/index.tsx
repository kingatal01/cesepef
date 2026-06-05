import Image from "next/image";
import { prisma } from "@/lib/prisma";
import SectionTitle from "../Common/SectionTitle";

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 17 16" className="fill-current">
    <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
  </svg>
);

const AvatarPlaceholder = ({ initial }: { initial: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
    {initial}
  </div>
);

const Team = async () => {
  const membres = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  if (membres.length === 0) return null;

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Notre Équipe"
          paragraph="CESEPEF réunit une équipe de cadres seniors et d'experts pluridisciplinaires totalisant plus de 60 années d'expérience cumulée au sein d'institutions publiques, d'organisations internationales et de bureaux d'études."
          center
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {membres.map((m) => (
            <div
              key={m.id}
              className="rounded-xs bg-white p-6 text-center shadow-two transition hover:shadow-lg dark:bg-gray-dark"
            >
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/20">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarPlaceholder initial={m.name.charAt(0)} />
                )}
              </div>
              <h4 className="mb-1 text-sm font-bold leading-snug text-black dark:text-white">
                {m.name}
              </h4>
              <p className="mb-3 text-xs text-body-color dark:text-body-color-dark">
                {m.role}
              </p>
              {m.department && (
                <p className="mb-3 text-[11px] font-medium text-primary/70">
                  {m.department}
                </p>
              )}
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  aria-label={`LinkedIn de ${m.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary transition hover:bg-primary hover:text-white"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
