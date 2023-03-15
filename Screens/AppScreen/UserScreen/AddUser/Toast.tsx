import React from "react";

// React Native
import {
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Alert,
  Toast,
} from "native-base";

const ToastPopper = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable,
  ...rest
}: any) => (
  <Alert
    width="90%"
    alignSelf="center"
    justifyContent={"center"}
    flexDirection="row"
    status={status ? status : "info"}
    variant={variant}
    {...rest}
  >
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text
            fontSize="md"
            fontWeight="medium"
            color={"darkText"}
            flexShrink={1}
          >
            {title}
          </Text>
        </HStack>
        {isClosable && (
          <IconButton
            onPress={() => Toast.close(id)}
            variant="unstyled"
            icon={<CloseIcon size="3" />}
            _icon={{
              color: "darkText",
            }}
          />
        )}
      </HStack>
      <Text px="6" color={"darkText"}>
        {description}
      </Text>
    </VStack>
  </Alert>
);

export default ToastPopper;
