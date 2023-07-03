import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import useMediaQuery from "../hooks/useMediaQuery";
import { Button, Divider } from "@mui/material";

const test = require("../assets/contactUsPageGraphic.webp");

const About = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <section id="contactus" style={{ paddingBottom: 200 }}>
        <motion.div>
          {/* HEADER */}
          <motion.div
            style={{ width: "100%", margin: "auto" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Title mainText="ABOUT US" />

              <p style={{ width: "55%", margin: "auto", marginTop: 50, fontSize: '1.2rem' }}>
                At BCard, we believe in the power of small businesses and their
                ability to shape communities and drive economic growth. Our
                platform is designed to provide a space where entrepreneurs like
                you can showcase your businesses, connect with potential
                customers, and unlock new opportunities. <br />
                <br /> Our mission is to empower business owners by offering
                them a convenient and effective way to promote their products or
                services. We understand the challenges that come with starting
                and growing a business, and we're here to support you every step
                of the way. Our goal is to create a vibrant online marketplace
                that fosters collaboration, networking, and success for all our
                members.
              </p>
            </motion.div>
            <Divider sx={{ marginTop: 5 }} />
            <div>
              <Title mainText="Why Choose BCard?" />
              <p style={{ width: "55%", margin: "auto", marginTop: 50, fontSize: '1.2rem' }}>
                {" "}
                <strong>Visibility:</strong> With our platform, you gain instant
                visibility among a diverse community of users actively seeking
                the products or services you offer. Increase your brand exposure
                and attract potential customers in your target market.
              </p>
              <br />
              <br />
              <p style={{ width: "55%", margin: "auto", fontSize: '1.2rem' }}>
                {" "}
                <strong>Ease of Use:</strong> Our user-friendly interface makes
                it simple to create and manage your business profile. You can
                easily upload images, provide detailed descriptions, and
                highlight your unique selling points. Showcase what makes your
                business stand out from the competition.
              </p>
              <br />
              <br />
              <p style={{ width: "55%", margin: "auto", fontSize: '1.2rem' }}>
                <strong>Networking Opportunities:</strong> Connect with other
                business owners, industry professionals, and potential partners
                through our networking features. Build valuable relationships,
                collaborate on projects, and exchange ideas to fuel your
                business growth.
              </p>
              <br />
              <br />
              <p style={{ width: "55%", margin: "auto", fontSize: '1.2rem' }}>
                <strong>Targeted Advertising:</strong> Tailor your advertising
                campaigns to reach your ideal audience. Our platform allows you
                to define specific demographics, interests, and geographical
                locations, ensuring your message is delivered to the right
                people at the right time.
              </p>
            </div>
          </motion.div>
          <Divider sx={{ marginTop: 5 }} />
          {/* FORM AND IMAGE */}
          {isAboveMediumScreens ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: 20,
                paddingBottom: 100,
              }}
            >
              <motion.div
                style={{ width: "70%" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Title mainText="Join Our Community Today!" />

                <p
                  style={{
                    width: "75%",
                    margin: "auto",
                    marginBottom: 50,
                    marginTop: 50,
                    fontSize: '1.2rem'
                  }}
                >
                  We invite you to become part of our growing community of
                  passionate entrepreneurs. Whether you're a small startup, a
                  local brick-and-mortar store, or a service-based business,
                  BCard offers you the platform to share your story, showcase
                  your products or services, and connect with a wider audience.
                  Together, let's make your business thrive. Feel free to
                  customize the content according to your specific brand voice,
                  values, and unique selling points.
                </p>
                <form
                  target="_blank"
                  onSubmit={onSubmit}
                  action="https://formsubmit.co/5e53288da9af531f27ea4abe61462f68"
                  method="POST"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  <input
                    style={{
                      marginBottom: 20,
                      borderRadius: 5,
                      height: "50px",
                      paddingLeft: 20,
                    }}
                    type="text"
                    placeholder="NAME"
                    {...register("name", {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>
                      {errors.name.type === "required" &&
                        "This field is required."}
                      {errors.name.type === "maxLength" &&
                        "Max length is 100 char."}
                    </p>
                  )}

                  <input
                    style={{
                      marginBottom: 20,
                      borderRadius: 5,
                      height: "50px",
                      paddingLeft: 20,
                    }}
                    type="text"
                    placeholder="EMAIL"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>
                      {errors.email.type === "required" &&
                        "This field is required."}
                      {errors.email.type === "pattern" &&
                        "Invalid email address."}
                    </p>
                  )}

                  <textarea
                    style={{
                      marginBottom: 20,
                      borderRadius: 5,
                      height: "150px",
                      padding: 10,
                    }}
                    placeholder="MESSAGE"
                    rows={4}
                    cols={50}
                    {...register("message", {
                      required: true,
                      maxLength: 2000,
                    })}
                  />
                  {errors.message && (
                    <p style={{ color: "red" }}>
                      {errors.message.type === "required" &&
                        "This field is required."}
                      {errors.message.type === "maxLength" &&
                        "Max length is 2000 char."}
                    </p>
                  )}
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </form>
              </motion.div>

              <motion.div
                style={{ display: "flex", alignItems: "end" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div>
                  <img alt="contact-us-page-graphic" src={test} />
                </div>
              </motion.div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 10,
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <motion.div
                style={{ padding: 20, width: "80%", marginBottom: 50 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Title mainText="Join Our Community Today!" />

                <p
                  style={{
                    width: "75%",
                    margin: "auto",
                    marginBottom: 50,
                    marginTop: 20,
                  }}
                >
                  We invite you to become part of our growing community of
                  passionate entrepreneurs. Whether you're a small startup, a
                  local brick-and-mortar store, or a service-based business,
                  [Your Website Name] offers you the platform to share your
                  story, showcase your products or services, and connect with a
                  wider audience. Together, let's make your business thrive.
                  Feel free to customize the content according to your specific
                  brand voice, values, and unique selling points.
                </p>
                <form
                  target="_blank"
                  onSubmit={onSubmit}
                  action="https://formsubmit.co/5e53288da9af531f27ea4abe61462f68"
                  method="POST"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    style={{
                      marginBottom: 20,
                      borderRadius: 5,
                      height: "40px",
                      paddingLeft: 20,
                    }}
                    type="text"
                    placeholder="NAME"
                    {...register("name", {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>
                      {errors.name.type === "required" &&
                        "This field is required."}
                      {errors.name.type === "maxLength" &&
                        "Max length is 100 char."}
                    </p>
                  )}

                  <input
                    style={{
                      marginBottom: 20,
                      borderRadius: 5,
                      height: "40px",
                      paddingLeft: 20,
                    }}
                    type="text"
                    placeholder="EMAIL"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>
                      {errors.email.type === "required" &&
                        "This field is required."}
                      {errors.email.type === "pattern" &&
                        "Invalid email address."}
                    </p>
                  )}

                  <textarea
                    style={{
                      marginBottom: 20,
                      borderRadius: 5,
                      height: "150px",
                      padding: 10,
                    }}
                    placeholder="MESSAGE"
                    rows={4}
                    cols={50}
                    {...register("message", {
                      required: true,
                      maxLength: 2000,
                    })}
                  />
                  {errors.message && (
                    <p style={{ color: "red" }}>
                      {errors.message.type === "required" &&
                        "This field is required."}
                      {errors.message.type === "maxLength" &&
                        "Max length is 2000 char."}
                    </p>
                  )}
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div style={{ padding: 20 }}>
                  <img
                    style={{ width: "100%" }}
                    alt="contact-us-page-graphic"
                    src={test}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default About;
