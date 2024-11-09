import { usePathname } from "next/navigation";

export const usePageLabel = () => {
  const pathName = usePathname();

  const pathNames = pathName.split("/");
  pathNames.shift();

  const capitalizedPathNames = pathNames.map(
    (pathName: string) => pathName.charAt(0).toUpperCase() + pathName.slice(1)
  );

  const joinedPathNames = capitalizedPathNames.join();

  const pageLabel =
    joinedPathNames === "" ? "Home" : joinedPathNames.replaceAll(",", " > ");

  return pageLabel;
};
