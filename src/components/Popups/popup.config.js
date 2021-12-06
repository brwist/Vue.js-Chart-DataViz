import ReturnComparison from "@/projectLibrary/AAA/ReturnComparison/ReturnComparison";
import AAB from "@/projectLibrary/AAB/RollingHistograms/AAB";
import AAC from "@/projectLibrary/AAC/OverlappingHistograms/AAC";
import OverlappingHistograms from "@/projectLibrary/AAD/OverlappingHistograms/OverlappingHistograms";
import DailyReturnIndexBottom from "@/projectLibrary/AAE/DailyReturnIndexBottom";
import SectorContributionComparison from "@/projectLibrary/AAF/SectorContributionComparison";
import SectorAttribution from "@/projectLibrary/AAG/SectorAttribution";


// Popup Configurations that define all of the potential
// popups that can be generated.

// Each object inside PopupResources follows the
// convention shown by the first example:

export const PopupResources = {
    // Project ID of the work that must be displayed in the popup. Must be globally unique.
    AAA: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Line chart for comparing return series",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Line chart for comparing return series",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: ReturnComparison,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 500,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAA",
        developerName: "Giorgi Ghviniashvili ",
        developerEmail: "mr.g.ghv@gmail.com",
        developerGithub: "https://github.com/giorgi-ghviniashvili",
        developerLinkedin: "https://www.linkedin.com/in/giorgi-ghviniashvili/",
        projectDescription: "Line chart for comparing return series",
        devTime: "3 hours",
        comments: "",

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart", "returns"],
    },
    AAB: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Rolling Histograms Visual",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Rolling Histograms Visual",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: AAB,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 500,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAB",
        developerName: 'Ivaylo Gelov',
        developerEmail: 'ivo_gelov@gmx.net',
        developerGithub: '',
        developerLinkedin: 'https://www.linkedin.com/in/ivogelov-web-developer',
        projectDescription: 'Rolling Histograms Visual',
        devTime: '4 hours',
        comments: '',

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart", "returns"],
    },
    AAC: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Overlapping Histograms Visual",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Overlapping Histograms Visual",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: AAC,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 500,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAC",
        developerName: 'Ivaylo Gelov',
        developerEmail: 'ivo_gelov@gmx.net',
        developerGithub: '',
        developerLinkedin: 'https://www.linkedin.com/in/ivogelov-web-developer',
        projectDescription: 'Overlapping Histograms Visual',
        devTime: '6 hours',
        comments: '',

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart", "returns"],
    },
    AAD: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Overlapping Histograms",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "D3 Visual",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: OverlappingHistograms,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 500,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAD",
        developerName: "Giorgi Ghviniashvili ",
        developerEmail: "mr.g.ghv@gmail.com",
        developerGithub: "https://github.com/giorgi-ghviniashvili",
        developerLinkedin: "https://www.linkedin.com/in/giorgi-ghviniashvili/",
        projectDescription: "Overlapping Histograms",
        devTime: "3 hours",
        comments: "",

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart", "D3"],
    },
    AAE: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Bottom Decile Line Series Comparison",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "AmCharts line chart",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: DailyReturnIndexBottom,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 700,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAE",
        developerName: "Madelein van der Merwe",
        developerEmail: "madelein@alis.capital",
        developerGithub: "https://github.com/Madelein-rezco",
        developerLinkedin: "https://www.linkedin.com/in/madelein-louw-7b3754134/",
        projectDescription: "Bottom Decile Line Series Comparison",
        devTime: "3 hours",
        comments: "",

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart"],
    },
    AAF: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Sector Return Contribution Comparison",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "AmCharts line chart",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: SectorContributionComparison,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 700,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAF",
        developerName: 'Ivaylo Gelov',
        developerEmail: 'ivo_gelov@gmx.net',
        developerGithub: '',
        developerLinkedin: 'https://www.linkedin.com/in/ivogelov-web-developer',
        projectDescription: 'Sector Contribution Comparison',
        devTime: '6 hours',
        comments: '',

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart"],
    },
    AAG: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Sector Attribution",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "AmCharts line chart",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: SectorAttribution,

        //Optional custom sizing parameters.
        //If omitted then will default to
        //pre-specified values.
        height: 700,
        width: 1000,
        minHeight: 400,
        minWidth: 600,

        //LIBRARY ITEM CONFIGURATION
        //  Various fields used to drive
        //  the details that are displayed for a project in our Library.
        projectID: "AAG",
        developerName: 'Ivaylo Gelov',
        developerEmail: 'ivo_gelov@gmx.net',
        developerGithub: '',
        developerLinkedin: 'https://www.linkedin.com/in/ivogelov-web-developer',
        projectDescription: 'Sector Attribution',
        devTime: '3.5 hours',
        comments: '',

        //Tags that can be given to the project. You could use this to categorise a project. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a project.
        tags: ["line chart"],
    },
};
