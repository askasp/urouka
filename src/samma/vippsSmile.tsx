import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

type classNames = "root";
const useStyles = makeStyles<Theme, {}, classNames>(theme => ({
  root: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fill: theme.palette.primary.main
  },
}));

export default function VippsSmile() {
  const classes = useStyles();
  return(<SvgIcon className={classes.root} width="64" height="64" viewBox="0 0 64 64">
   <path fill="#FF5B24" d="m50.882658,15.153611c0,4.394825 -3.525422,7.324709 -7.559813,7.324709c-4.03187,0 -7.559813,-2.929884 -7.559813,-7.324709c0,-4.394605 3.527943,-7.324488 7.559813,-7.324488c4.03439,0 7.559813,3.174004 7.559813,7.324488zm-17.384888,30.030535c9.323899,0 14.613178,-4.394825 19.65313,-10.742612c2.77171,-3.418124 6.299653,-4.150705 8.819743,-2.197523c2.519861,1.953182 2.771939,5.615647 0,9.033771c-7.307964,9.277671 -16.629113,14.893097 -28.472873,14.893097c-12.854133,0 -24.193738,-6.836248 -32.005628,-18.799682c-2.268013,-3.174004 -1.763857,-6.592128 0.756004,-8.30119c2.519861,-1.709062 6.299882,-0.976481 8.570186,2.441643c5.543878,8.05707 13.10369,13.672496 22.679438,13.672496z" clipRule="evenodd" fillRule="evenodd"/>
</SvgIcon>);
}
