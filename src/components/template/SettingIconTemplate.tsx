import React from "react";

const SettingIconTemplate = ({
    children,
    label,
}: {
    children: React.ReactNode;
    label: string;
}) => {
    return (
        <section className="flex justify-between gap-4 rounded bg-secondary p-3">
            <p className="my-auto">{label}</p>
            {children}
        </section>
    );
};

export default SettingIconTemplate;
