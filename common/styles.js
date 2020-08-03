import colors from "./colors";

export default {
    CommonStyles: {
        center_portion: { alignItems: 'center', justifyContent: 'center', },
        full_flex: { flex: 1 },
        SafeAreaStyle: { height: 20, backgroundColor: '#202335' },
        header_container: {
            height: 50,
            alignItems: "center",
            backgroundColor: colors.THEME_BLUE,
            flexDirection: "row",
            justifyContent: "space-between",
          },
    },
}