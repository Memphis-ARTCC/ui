import Page from "@/components/page";
import { canAirports } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Airports | Memphis ARTCC",
    description: "Memphis ARTCC"
};

export default function Airports() {
    return (
        <Page title="Airports" create authCheck={canAirports}>
            <div className="text-center">
                <h2>Hello, airports!</h2>
            </div>
        </Page>
    );
}