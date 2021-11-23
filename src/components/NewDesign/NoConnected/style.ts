import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    width: '1140px',
    height: '600px',
    position: 'absolute',
    top: -10,
    zIndex: 4
  },
  root: {
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
    width: '100%',
    height: '100%'
  },
  img: {
    paddingBottom: 25
  },
  blur: {
    width: '1140px',
    height: '600px',
    backgroundColor: 'rgba(12, 11, 13, 0.8)',
    filter: 'blur(4px) brightness(0.4)',
    position: 'absolute',
    top: -10,
    zIndex: 3
  },
  desc: {
    ...newTypography.body1,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightInfoText
  },
  button: {
    marginTop: 20,
    color: colors.white.main,
    background: colors.invariant.accent1,
    ...newTypography.body1
  }
}))

export default useStyles
