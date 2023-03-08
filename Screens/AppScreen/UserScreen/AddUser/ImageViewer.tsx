import { View, Text, Image } from "react-native";
import React from "react";
import { Box, Avatar } from "native-base";

interface ImageViewer {
  placeholderImageSource: string;
  selectedImage?: any | null;
}

const ImageViewer: React.FC<ImageViewer> = ({ selectedImage }) => {
  return (
    <Box>
      {selectedImage === null ? (
        <Avatar
          alignSelf="center"
          size="2xl"
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
        />
      ) : (
        <Avatar
          alignSelf="center"
          size="2xl"
          source={{
            uri: selectedImage,
          }}
        />
      )}
    </Box>
  );
};

export default ImageViewer;
