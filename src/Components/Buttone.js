import { Button } from "native-base";
import { React } from "react";

function Buttone({  mb, mt, bg, color, childern, onPress,isDisabled}) {
  return (
    <Button
      w={"full"}
      h={55}
      mt={mt}
      mb={mb}
      rounded="full"
      bg={bg}
      isDisabled={isDisabled}
      _text={{ color: color, fontWeight: "bold" }}
      _pressed={{ bg: bg }}
        onPress={onPress}
    >
        {childern}
    </Button>
  );
}
export default Buttone;
