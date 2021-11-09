import DailyReturnIndex from "@/views/Metrics/DailyReturnIndex";
import ReturnsMonthly from "@/views/Metrics/ReturnsMonthly";
import ReturnsQuarterly from "@/views/Metrics/ReturnsQuarterly";
import ReturnsAnnually from "@/views/Metrics/ReturnsAnnually";
import VolatilityMonthly from "@/views/Metrics/VolatilityMonthly";
import VolatilityAnnually from "@/views/Metrics/VolatilityAnnually";
import SharpeMonthly from "@/views/Metrics/SharpeMonthly";
import SharpeAnnually from "@/views/Metrics/SharpeAnnually";
import SharpeMonthlyAnnualised from "@/views/Metrics/SharpeMonthlyAnnualised";
import MaxDrawDownMonthly from "@/views/Metrics/MaxDrawDownMonthly";
import MaxDrawDownQuarterly from "@/views/Metrics/MaxDrawDownQuarterly";
import MaxDrawDownAnnually from "@/views/Metrics/MaxDrawDownAnnually";


// Popup Configurations that define all of the potential
// popups that can be generated.
//
// Each object inside PopupResources follows the
// convention shown by the example:
// //Name of the popup which must be globally unique.
// ruanPopup: {
//     //POPUP CONFIGURATION
//     //  Various elements used to drive
//     //  the generation of the popup.
//
//     //Title of the popup.
//     title: "Example popup",
//     //Subtitle of the popup.
//     //This may be omitted.
//     subTitle: "This is something we generated",
//     //Component which will be rendered
//     //inside the popup. Ensure that the
//     //component is imported.
//     component: RuanTest,
//
//     //Optional custom sizing parameters.
//     //If omitted then will default to
//     //prespecified values.
//     height: 500,
//     width: 1000,
//     minHeight: 400,
//     minWidth: 600,
//
//     //LIST CONFIGURATION
//     //  Various elements used to drive
//     //  the generation of the list that
//     //  open up the popups.
//
//     //Title used in the list.
//     listItemTitle: "Example list title",
//     //Description used in list.
//     listItemDescription: "This is a longer description of what the chart displays.",
//
//     //Tags that can be given to configs. You could use this to categorise metric components. For example give each line chart component a tag "line chart". Or assign a tag that can be used as an additional keyword match when searching for a metric.
//     tags: ["line chart", "example"],
// },
export const PopupResources = {
    DailyReturnIndex: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Daily Return Index",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares daily return indices for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: DailyReturnIndex,

        //Optional custom sizing parameters.
        height: 650,
        width: 1200,
        minHeight: 400,
        minWidth: 1200,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Daily Return Index",
        //Description used in list.
        listItemDescription: "Chart compares daily return indices for selected branches.",

        tags: ["return index", "test1"],
    },
    MonthlyReturns: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Monthly Returns",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares monthly returns for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: ReturnsMonthly,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Monthly Returns",
        //Description used in list.
        listItemDescription: "Chart compares monthly returns of selected branches.",

        tags: ["monthlytest", "test2"],
    },
    ReturnsQuarterly: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Quarterly Returns",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares quarterly returns for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: ReturnsQuarterly,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Quarterly Returns",
        //Description used in list.
        listItemDescription: "Chart compares quarterly returns of selected branches.",
    },
    ReturnsAnnually: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Annual Returns",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares annual returns for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: ReturnsAnnually,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Annual Returns",
        //Description used in list.
        listItemDescription: "Chart compares annual returns of selected branches.",
    },
    VolatilityMonthly: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Monthly Volatility",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares monthly volatility for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: VolatilityMonthly,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Monthly Volatility",
        //Description used in list.
        listItemDescription: "Chart compares monthly volatility of selected branches.",
    },
    VolatilityAnnually: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Annual Volatility",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares annual volatility for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: VolatilityAnnually,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Annual Volatility",
        //Description used in list.
        listItemDescription: "Chart compares annual volatility of selected branches.",
    },
    SharpeMonthly: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Monthly Sharpe Ratio",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares monthly Sharpe ratios for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: SharpeMonthly,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Monthly Sharpe Ratios",
        //Description used in list.
        listItemDescription: "Chart compares monthly Sharpe ratios of selected branches.",
    },
    SharpeAnnually: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Annual Sharpe Ratio",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares annual Sharpe ratios for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: SharpeAnnually,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Annual Sharpe Ratios",
        //Description used in list.
        listItemDescription: "Chart compares annual Sharpe ratios of selected branches.",
    },
    SharpeMonthlyAnnualised: {
    //POPUP CONFIGURATION
    //  Various elements used to drive
    //  the generation of the popup.

    //Title of the popup.
    title: "Annualised Monthly Sharpe Ratio",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares annualised monthly Sharpe ratios for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: SharpeMonthlyAnnualised,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Annualised Monthly Sharpe Ratios",
        //Description used in list.
        listItemDescription: "Chart compares annualised monthly Sharpe ratios of selected branches.",
    },
    MaxDrawDownMonthly: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Monthly Max Draw-down",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares monthly max draw-down for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: MaxDrawDownMonthly,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Monthly Max Draw-down",
        //Description used in list.
        listItemDescription: "Chart compares monthly max draw-down of selected branches.",
    },
    MaxDrawDownQuarterly: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Quarterly Max Draw-down",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares quarterly max draw-down for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: MaxDrawDownQuarterly,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Quarterly Max Draw-down",
        //Description used in list.
        listItemDescription: "Chart compares quarterly max draw-down of selected branches.",
    },
    MaxDrawDownAnnually: {
        //POPUP CONFIGURATION
        //  Various elements used to drive
        //  the generation of the popup.

        //Title of the popup.
        title: "Annual Max Draw-down",
        //Subtitle of the popup.
        //This may be omitted.
        subTitle: "Chart compares annual max draw-down for selected branches.",
        //Component which will be rendered
        //inside the popup. Ensure that the
        //component is imported.
        component: MaxDrawDownAnnually,

        //Optional custom sizing parameters.
        height: 650,
        width: 1000,
        minHeight: 650,
        minWidth: 1000,

        //LIST CONFIGURATION
        //  Various elements used to drive
        //  the generation of the list that
        //  open up the popups.

        //Title used in the list.
        listItemTitle: "Annual Max Draw-down",
        //Description used in list.
        listItemDescription: "Chart compares annual max draw-down of selected branches.",
    }
};
