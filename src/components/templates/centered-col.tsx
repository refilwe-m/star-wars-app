import type { FC, PropsWithChildren } from "react";

export const CenteredColumn: FC<PropsWithChildren> = ({ children }) => {
	return <section className="flex flex-col items-center">{children}</section>;
};
