"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { type FC } from "react";
import { AssetInput, ExecuteButton } from "../complex";
import { formatAssetAmount } from "@/util";
import type { Asset } from "@/types";
import type { UseExecuteContractResult } from "@/hooks";
import { useChain } from "@cosmos-kit/react";
import { ENDPOINTS } from "@/constants";

interface Props {
  nativeAsset: Asset;
  mintAsset: Asset;
  onChange: (displayAmount: string) => void;
  burnDisplayAmount: string;
  disabled: boolean;
  chainName: string;
  executeBurn?: UseExecuteContractResult;
}

export const BurnerForm: FC<Props> = ({
  burnDisplayAmount,
  nativeAsset,
  mintAsset,
  onChange,
  disabled,
  chainName,
  executeBurn,
}) => {
  const { isWalletConnected } = useChain(chainName);

  const canExecute =
    Number(burnDisplayAmount) > 0 &&
    Number(burnDisplayAmount) * Math.pow(10, nativeAsset.decimals) <=
      nativeAsset.amount;

  const action = !isWalletConnected
    ? "Connect Wallet"
    : burnDisplayAmount === ""
    ? "Enter Input"
    : canExecute
    ? "Burn"
    : "Invalid Input";

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      minHeight="65vh"
      direction="column"
      spacing={2}
      width={542}
    >
      {ENDPOINTS[chainName].subTitle && ENDPOINTS[chainName].title && (
        <>
          <Typography
            sx={{ textAlign: "center", fontSize: 20, fontWeight: 500, color: '#3CCD64' }}
          >
            {ENDPOINTS[chainName].subTitle}
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: 72, fontWeight: 900}}
          >
            {ENDPOINTS[chainName].title}
          </Typography>
        </>
      )}
      <Grid xs={12}>
        <Card>
          <CardHeader title="Burn" />
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <AssetInput
                invalidAmount={!canExecute}
                asset={nativeAsset}
                prefillClick={() => onChange(formatAssetAmount(nativeAsset))}
                value={burnDisplayAmount}
                label="You Burn"
                onChange={(e) => onChange(e.target.value)}
                helperText={`Available: ${formatAssetAmount(nativeAsset)}`}
                disabled={!isWalletConnected}
              />
              <AssetInput
                asset={mintAsset}
                value={burnDisplayAmount}
                label="You Get"
                disabled={true}
                helperText={`Available: ${formatAssetAmount(mintAsset)}`}
              />
              <CardActions>
                {executeBurn != null ? (
                  <ExecuteButton
                    isWalletConnected={isWalletConnected}
                    chainName={chainName}
                    action={action}
                    disabled={disabled || !isWalletConnected}
                    {...executeBurn}
                  />
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    size="large"
                    sx={{ width: 256 }}
                  >
                    <CircularProgress color="inherit" size={26} />
                  </Button>
                )}
              </CardActions>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BurnerForm;
