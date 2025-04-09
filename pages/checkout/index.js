import CssBaseline from "@mui/material/CssBaseline";
import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Prescription from "../../src/components//Prescription";
import RedirectWhenCartEmpty from "../../src/components/checkout/RedirectWhenCartEmpty";
import Item from "../../src/components/checkout/item-checkout";
import Parcel from "../../src/components//parcel";
import CustomContainer from "../../src/components/container";
import MainLayout from "../../src/components/layout/MainLayout";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import SEO from "../../src/components/seo";
import { getServerSideProps } from "../index";
import { getImageUrl } from "utils/CustomFunctions";

const Page = ({ configData, landingPageData }) => {
  const router = useRouter();
  const { page, store_id, id } = router.query;
  const {
    cartList: aliasCartList,
    campaignItemList,
    buyNowItemList,
    totalAmount,
  } = useSelector((state) => state.cart);
  const cartList = getCartListModuleWise(aliasCartList);

  return (
    <>
      <CssBaseline />
      <SEO
        configData={configData}
        title={configData ? `` : "Loading..."}
        image={`${getImageUrl(
          { value: configData?.logo_storage },
          "business_logo_url",
          configData
        )}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />

      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomContainer>
          <AuthGuard from="">
            {page === "parcel" && <Parcel configData={configData} />}
            {page === "prescription" && (
              <Prescription
                storeId={store_id}
                configData={configData}
              />
            )}
            {page === "campaign" && campaignItemList.length > 0 && (
              <Item
                router={router}
                configData={configData}
                page={page}
                cartList={cartList}
                campaignItemList={campaignItemList}
                totalAmount={totalAmount}
              />
            )}
            {page === "cart" && (
              <Item
                router={router}
                configData={configData}
                page={page}
                cartList={cartList}
                campaignItemList={campaignItemList}
                totalAmount={totalAmount}
              />
            )}
            {page === "buy_now" && buyNowItemList.length > 0 && (
              <Item
                router={router}
                configData={configData}
                page={page}
                cartList={buyNowItemList}
                campaignItemList={campaignItemList}
                totalAmount={totalAmount}
              />
            )}
            <RedirectWhenCartEmpty
              page={page}
              cartList={aliasCartList}
              campaignItemList={campaignItemList}
              buyNowItemList={buyNowItemList}
            />
          </AuthGuard>
        </CustomContainer>
      </MainLayout>
    </>
  );
};

export default Page;
export { getServerSideProps };
