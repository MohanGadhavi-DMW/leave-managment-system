import { getReferrer } from "../../src/utils/ObjectHelper.jsx";

import { getReferrer } from "@/utils/ObjectHelper";

export const redirectToReferer = () => {
    const params = new URLSearchParams(window.location.href);
    const redirectPath = getReferrer(params.get("referrer"));
    window.location.href = redirectPath;
    return null
}