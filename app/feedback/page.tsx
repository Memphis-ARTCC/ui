import Page from "@/components/page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feedback | Memphis ARTCC",
    description: "Memphis ARTCC"
};

export default function feedback() {
    return (
        <Page title="Feedback">
            <div className="text-center">
                <h2>Hello, test!</h2>
            </div>
        </Page>
    );
}