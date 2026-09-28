import Mail from "../icons/Mail";
import { TbBrandLinkedinFilled } from "react-icons/tb";


const ROTATIONS = [
  "-rotate-3",
  "rotate-2",
  "-rotate-1",
  "rotate-3",
  "-rotate-2",
];

export default function TeamMembers() {
  const teamMembers = [
    {
      name: "Rwan Adel Omar",
      role: "Software Engineer",
      imgSrc: "/rwan.jpg",
      email: "rwan32310@gmail.com",
      linkedIn: "https://www.linkedin.com/in/rwan-adel-7315bb23b/",
    },
    {
      name: "Shady Mohamed Radwan",
      role: "Software Engineer",
      imgSrc: "/shady.jpeg",
      email: "yd.radwan@gmail.com",
      linkedIn: "https://www.linkedin.com/in/shady-radwan-8b0003196/",
    },
    {
      name: "Farah Mahmoud Mahfouz",
      role: "Software Engineer",
      imgSrc: "/farah.jpeg",
      email: "farahmahfouz11@gmail.com",
      linkedIn: "https://www.linkedin.com/in/farahmahfouz/",
    },
    {
      name: "Fatma Elzahraa Abdelaleem",
      role: "Software Engineer",
      imgSrc: "/zahra.jpeg",
      email: "fatmaabdelaleem24@gmail.com",
      linkedIn:
        "https://www.linkedin.com/in/zahra-abdelaleem-%F0%93%82%86-1a56a4139/",
    },
    {
      name: "Yasser Ahmed Salem",
      role: "Software Engineer",
      imgSrc: "/yasser.jpg",
      email: "yassersalem9099@gmail.com",
      linkedIn: "https://www.linkedin.com/in/yasser-salem-118b7b214/",
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {teamMembers.map((member, index) => (
        <div
          key={member.email}
          className={`group w-36 sm:w-40 bg-white rounded-xl p-2 pb-3 shadow-cardShadow text-center ${ROTATIONS[index % ROTATIONS.length]
            } hover:rotate-0 hover:-translate-y-2  transition-transform duration-300 ease-out`}
        >
          <img
            src={member.imgSrc}
            alt={member.name}
            className="w-full h-40 sm:h-44 object-cover rounded-lg bg-slate-200"
          />

          <p
            title={member.name}
            className="mt-2 font-bold text-indigo-950 leading-tight"
          >
            {member.name.trim().split(" ")[0]}
          </p>
          <p className="text-xs text-primary italic">{member.role}</p>

          <div className="mt-2 flex justify-center items-center gap-3 h-0 opacity-0 overflow-hidden group-hover:h-6 group-hover:opacity-100 transition-all duration-300">
            <a
              href={`mailto:${member.email}`}
              className="text-primary hover:scale-110 transition-transform"
              aria-label={`Email ${member.name}`}
            >
              <Mail />
            </a>
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
            >
              <TbBrandLinkedinFilled   className="size-6 text-primary"/>


            </a>
          </div>
        </div>
      ))}
    </div>
  );
}