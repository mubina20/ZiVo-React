import Cookies from "universal-cookie";

const cookies = new Cookies();
let verifiedMemberData: any = null;

if (cookies.get("access_token")) {
    const memberDataJson: any = localStorage.getItem("member_data");
    
    if (memberDataJson) {
        let member_data = JSON.parse(memberDataJson);

    //     if (member_data.mb_profile_image) {
    //         member_data.mb_profile_image = `${serverApi}/${member_data?.mb_profile_image}`.replace(/\\/g,'/');
    //     } else {
    //         member_data.mb_profile_image = "/icons/user.png";
    //     }
        verifiedMemberData = member_data;
    }
} else {
    localStorage.removeItem("member_data");
}

console.log("=== verify ===");
console.log("VERIFIED_MEMBER_DATA :: ", verifiedMemberData);

export { verifiedMemberData };
