//---------------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
  Linking,
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import RNPdfLib from "react-native-pdf-lib";
import { NavigationContainer } from "@react-navigation/native";

// import { createStackNavigator } from "@react-navigation/stack"; // not working giving error modulenotfound, working in devbox
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //same
// import { createDrawerNavigator } from "@react-navigation/drawer"; same
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // same
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler"; // giving error in this template but its recommended
// since no navigation working, lets create custom buttons

// const Stack = createStackNavigator(); // no error but nt working, use  native stack navgtr
const Stack = createNativeStackNavigator();
// function MyStack() {
//   return (
//     <Stack.Navigator initialRouteName="Page1_Home">
//       <Stack.Screen name="Page1_Home" component={Page1} />
//       <Stack.Screen name="Page2" component={Page2} />
//       {/* <Stack.Screen name="Page3" component={Page3} /> */}
//     </Stack.Navigator>
//   );
// }

function App() {
  // useEffect(() => {
  //   return () => {};
  // }, []);
  // const [dta, setDta] = useState(""); // later
  return (
    <View style={styles.container}>
      {/* ----------------------------------------------------------- */}
      <NavigationContainer>
        {/* <MyStack /> */}
        <Stack.Navigator initialRouteName="cv">
          <Stack.Screen
            name="cv"
            component={Page1}
            options={{ headerShown: false }}
            // initialParams={(dta, setDta)} // later
          />
          <Stack.Screen
            name="Page2"
            component={Page2}
            options={{ headerShown: false }}
            initialParams={[]}
          />
          {/* <Stack.Screen name="Page3" component={Page3} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* ----------------------------------------------------------- */}
    </View>
  );
}
export default App;

//------------------------------------------------------------------------------------------------

const Clock = () => {
  const [date, setDate] = useState(new Date().toLocaleString());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <Text style={styles.clock}>🕘 {date.toLocaleString()}</Text>;
};

//---------------------------------------------------------------------------------------------------
const Page1 = ({ navigation }) => {
  //
  const [dta, setDta] = useState("");
  const [hdng, setHdng] = useState("");
  const [fld, setFld] = useState("");
  const [vlu, setVlu] = useState("");
  const [nwd, setNwd] = useState(false);
  const inputRef = useRef(null);

  const handleUpdateAndAddNewField = () => {
    if (hdng !== "" /* && fld && vlu */) {
      setDta((prevData) => ({
        ...prevData,
        [hdng]: [
          ...(prevData[hdng] || []), // checking empty for first heading created
          {
            field: fld,
            value: vlu,
          },
        ],
      }));
      setFld("");
      setVlu("");
    }
  };
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <Clock />
      <Button
        style={styles.button}
        title="about"
        onPress={() => {
          alert(
            "click new, ui changes and heading input box appear, fill the heading and click the enter button, ui changes, heading input disappears,  input field appears for field and value which u can choose to fill or not, suppose its your name and no  field value required, just click update without field value before clicking new heading, ui changes, heading input box appears again while field value inputs disappeard and you can enter next heading like education and add field values like hse, ssc, graduation etc, at last, click download pdf",
          );
        }}
      />
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL("https://github.com/tfml1")}
      >
        GITHUB
      </Pressable>
      {/* <View>------------------------------</View> */}
      {/* <Button
        style={styles.button}
        title="Go_to_page_2"
        onPress={() => navigation.navigate("Page2", { dta })}
      /> */}
      {/* <View>------------------------------</View> */}

      <Text style={styles.heading}>ReactNative CV maker </Text>
      <Button
        style={styles.button}
        title="New"
        onPress={() => {
          setNwd(true);
          setDta("");
          setHdng("");
          setFld("");
          setVlu("");
        }}
      />
      {/* <View>      </View>   <Text style={styles.mtx}></Text> */}
      <View>
        <View> </View> <Text style={styles.mtx}>how to use:</Text>
        <View> </View> <Text style={styles.mtx}></Text>
        <View> </View> <Text style={styles.mtx}></Text>
        <View>First, click new,</View>
        <View>
          <Text style={styles.mtx}>1. </Text>
          ui changes and heading input box appear, fill the heading and click
          the enter button,
        </View>
        <View>
          <Text style={styles.mtx}>2. </Text>
          ui changes again, heading input disappears, input field appears for
          field and value which u can choose to fill or not,
        </View>
        <View>
          <Text style={styles.mtx}>3. </Text>
          suppose its your name and no field value required, just click update
          without field value before clicking new heading,
        </View>
        <View>
          <Text style={styles.mtx}>4. </Text>
          ui changes, heading input box appears again while field value inputs
          disappeard and you can enter next heading like education and add field
          values like hse, ssc, graduation etc,{" "}
        </View>
        <View>
          <Text style={styles.mtx}>5. </Text> update each time and the updated
          cv appears below
        </View>
        <View> </View> <View> </View> <View> </View>{" "}
        <Text style={styles.mtx}>
          <Text style={styles.mtx}>6. </Text>
        </Text>{" "}
        at last, after filling in all the details, click download pdf
        <View>
          <Text style={styles.mtz}>
            ( there are bugs to be resolved, incomplete ui n entire ui
            downloaded as home page along with cv in 2nd page, also url and time
            of creation at top and bottom)
          </Text>
        </View>
      </View>

      {/* ------------------------------------------------------- */}
      {nwd && (
        <View>
          {hdng === "" ? (
            <View>
              Enter new heading:
              <TextInput
                style={styles.input}
                ref={inputRef}
                onChangeText={(text) => {
                  inputRef.current.value = text;
                }}
                // value={hdng}
                placeholder="Enter Heading... (bold+underlined)"
              />
              {/* <View></View> */}
              <Button
                style={styles.button}
                title="Enter Heading"
                onPress={() => {
                  if (inputRef.current.value.trim() !== "") {
                    setHdng(inputRef.current.value.trim());
                  }
                }}
              />
            </View>
          ) : (
            <View>
              Enter new field and value for : {hdng} or just press update if
              none
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setFld(text.trim());
                }}
                value={fld}
                placeholder="Enter field... (bold+italic)"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setVlu(text.trim());
                }}
                value={vlu}
                placeholder="Enter value... (normal text)"
              />
              {/* <View></View> */}
              <Button
                style={styles.button}
                title="update heading &&/|| Field:Value"
                onPress={handleUpdateAndAddNewField}
              />
              <Button
                style={styles.button}
                title="New heading"
                onPress={() => {
                  setHdng("");
                  setFld("");
                  setVlu("");
                }}
              />
            </View>
          )}
        </View>
      )}
      <hr />
      <hr />
      <View>
        {dta && (
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Page2", { dta })}
            title="Download CV as PDF"
          />
        )}
      </View>

      <View>
        {/* {dta && JSON.stringify(dta)} */}
        {dta && (
          <View>
            {Object.entries(dta).map(([heading, fields], index) => (
              <View key={index}>
                <View>
                  <Text style={styles.headingx}>{heading}</Text>
                </View>

                {fields.map((fieldObj, fieldIndex) => (
                  <View key={fieldIndex} style={styles.field}>
                    <Text style={styles.mty}>* </Text>{" "}
                    {fieldObj.field !== "" && (
                      <Text style={styles.fieldKey}>
                        {fieldObj.field}
                        {fieldObj.value && " :"}
                      </Text>
                    )}
                    {fieldObj.value !== "" && (
                      <Text style={styles.fieldValue}>{fieldObj.value}</Text>
                    )}
                  </View>
                ))}
                {/* ////////////////////////////////////// */}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* -------------------------------------- */}
    </View>
  );
};

const Page2 = ({ navigation, route }) => {
  //
  const { dta } = route.params;

  const downloadAsPDF = async () => {
    if (!dta) {
      alert("No data available to download");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <style>
            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
              padding: 5px;
            }
            h1{
             
            }
          </style>
        </head>
        <body>
          ${Object.entries(dta)
            .map(
              ([heading, fields]) => `
              <h1><u>${heading}</u></h1>
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${fields
                    .map(
                      (fieldObj) => `
                      <tr>
                        <td>${fieldObj.field}</td>
                        <td>${fieldObj.value}</td>
                      </tr>
                    `,
                    )
                    .join("")}
                </tbody>
              </table>
            `,
            )
            .join("")}
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Download CV",
    });
  };
  downloadAsPDF();

  return (
    <View style={styles.container}>
      {/* <View>------------------------------</View> */}
      <Button
        style={styles.button}
        title="Go back to to Home"
        onPress={() => navigation.navigate("cv")}
      />
      {/* Render the dta object */}
      <ScrollView>
        {Object.entries(dta).map(([heading, fields], index) => (
          <View key={index}>
            <View>
              <Text style={styles.headingx}>{heading}</Text>
            </View>

            {fields.map((fieldObj, fieldIndex) => (
              <View key={fieldIndex} style={styles.field}>
                <Text style={styles.mty}>* </Text>{" "}
                {fieldObj.field !== "" && (
                  <Text style={styles.fieldKey}>
                    {fieldObj.field}
                    {fieldObj.value && " :"}
                  </Text>
                )}
                {fieldObj.value !== "" && (
                  <Text style={styles.fieldValue}>{fieldObj.value}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
//----------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f0f0f0",
    // alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: "auto",
    marginVertical: "1.125rem",
    // maxWidth: 400,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bty: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    padding: 12,
    width: 244,
    marginBottom: 10,
    fontSize: 18,
    paddingVertical: 8,
    backgroundColor: "#f8f8f8",
  },
  button: {
    backgroundColor: "#008CBA",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 16,
    margin: 10,
  },

  clock: {
    lineHeight: "1.5em",
    fontSize: "1.225rem",
    fontWeight: 1000,
    marginVertical: "1em",
    // margin: 12,
    // marginHorizontal: 12,
    // color: "red",
    textAlign: "left",
    border: 30,
    borderColor: "gold",
  },
  ////////////////////////////////////
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bty: {
    color: "gray",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    padding: 10,
    width: "90%",
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#008CBA",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 16,
    margin: 10,
  },
  buttonvw: {
    margin: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  u: {
    textDecorationLine: "underline",
  },
  clock: {
    lineHeight: "1.5em",
    fontSize: "1.225rem",
    fontWeight: 1000,
    marginVertical: "1em",
    // margin: 12,
    // marginHorizontal: 12,
    // color: "red",
    textAlign: "left",
    border: 30,
    borderColor: "gold",
  },
  // cv
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  headingx: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
    textDecorationLine: "underline",
    // color: "white",
    // backgroundColor: "black",
  },
  headingbg: {
    backgroundColor: "black",
  },
  field: {
    flexDirection: "row",
    marginBottom: 0,
    // paddingBottom: 3,
  },
  fieldKey: {
    fontWeight: "bold",
    fontStyle: "italic",
    paddingBottom: 3,
  },
  fieldValue: {
    marginLeft: 5,
  },
  mtx: {
    fontSize: 22,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    marginRight: 8,
  },
  mty: {
    fontSize: 11,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    marginRight: 8,
  },
  mtz: {
    fontSize: 8,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    marginRight: 8,
    backgroundColor: "gray",
  },
  MimeTypeArray: {
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    marginRight: 8,
  },
});

/*

*/
