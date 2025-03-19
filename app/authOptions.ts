import GoogleProvider from "next-auth/providers/google";

//create authOptions
export const authOptions = {
  //array of providers
  providers: [
    //inside of the array you cal the constructors for all of providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  //add nextAuth secret
  secret: process.env.AUTH_SECRET,
};
