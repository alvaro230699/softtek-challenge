function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.log(process.env);
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}
let DYNAMODB_FUSION_TABLE: string;
let DYNAMODB_FUSION_PARTITION: string;
let DYNAMODB_EARTH_TABLE: string;
let DYNAMODB_CACHE_TABLE: string;
let DYNAMODB_LOCAL_ENDPOINT: string;
let AWS_REGION: string;
let JWT_SECRET: string;
let OPENWEATHER_API: string = "";
export const IS_OFFLINE = getEnvVariable("IS_OFFLINE");

if (IS_OFFLINE == "true") {
  AWS_REGION = getEnvVariable("AWS_REGION");
  DYNAMODB_FUSION_TABLE = getEnvVariable("DYNAMODB_FUSION_TABLE");
  DYNAMODB_FUSION_PARTITION = getEnvVariable("DYNAMODB_FUSION_PARTITION");
  DYNAMODB_EARTH_TABLE = getEnvVariable("DYNAMODB_EARTH_TABLE");
  DYNAMODB_CACHE_TABLE = getEnvVariable("DYNAMODB_CACHE_TABLE");
  DYNAMODB_LOCAL_ENDPOINT = getEnvVariable("DYNAMODB_LOCAL_ENDPOINT");
} else {
  JWT_SECRET = getEnvVariable("JWT_SECRET");
  AWS_REGION = getEnvVariable("AWS_REGION");
  DYNAMODB_FUSION_TABLE = getEnvVariable("DYNAMODB_FUSION_TABLE");
  DYNAMODB_FUSION_PARTITION = getEnvVariable("DYNAMODB_FUSION_PARTITION");
  DYNAMODB_EARTH_TABLE = getEnvVariable("DYNAMODB_EARTH_TABLE");
  DYNAMODB_CACHE_TABLE = getEnvVariable("DYNAMODB_CACHE_TABLE");
  OPENWEATHER_API = getEnvVariable("OPENWEATHER_API");
  DYNAMODB_LOCAL_ENDPOINT = getEnvVariable("DYNAMODB_LOCAL_ENDPOINT");
}

export {
  DYNAMODB_FUSION_TABLE,
  DYNAMODB_FUSION_PARTITION,
  DYNAMODB_EARTH_TABLE,
  DYNAMODB_CACHE_TABLE,
  DYNAMODB_LOCAL_ENDPOINT,
  JWT_SECRET,
  AWS_REGION,
  OPENWEATHER_API,
};
