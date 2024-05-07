import Page from "@/components/page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Visit | Memphis ARTCC",
    description: "Memphis ARTCC"
};

export default function Visit() {
    return (
        <Page title="Visiting Application">
            <div className="text-center">
                <h2>Hello, visit app!</h2>
            </div>
        </Page>
    );
}