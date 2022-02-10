import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: 'transparent',
    '& > *': {
      backgroundColor: 'transparent'
    }
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.invariant.component,
    padding: 12,
    borderRadius: 20,
    color: colors.white.main,
    '& h2': {
      ...typography.heading4
    },
    '& p': {
      ...typography.body3,
      color: colors.invariant.lightHover,
      marginBottom: 5
    }
  },

  selectTokenClose: {
    position: 'relative',
    minWidth: 0,
    height: 20,
    marginLeft: 20,
    '&:after': {
      content: '"\u2715"',
      fontSize: 25,
      position: 'absolute',
      color: colors.invariant.lightInfoText,
      top: '90%',
      right: '0%',
      transform: 'translateY(-50%)'
    },
    '&:hover': {
      backgroundColor: colors.invariant.component
    }
  },
  detailsInfoForm: {
    border: `1px solid ${colors.invariant.component}`,
    color: colors.invariant.lightInfoText,
    borderRadius: 15,
    width: '93%',
    backgroundColor: colors.invariant.dark,
    padding: '10px 8px',
    '&::placeholder': {
      color: colors.invariant.lightInfoText
    },
    '&:focus': {
      outline: 'none'
    }
  },
  detailsInfoBtn: {
    backgroundColor: colors.invariant.green,
    borderRadius: 5,
    border: 'none',
    padding: '4px 10px',
    marginLeft: -60,
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(1.15)',
      boxShadow:
        '0px 3px 1px -2px rgba(43, 193, 144, 0.2),0px 1px 2px 0px rgba(45, 168, 128, 0.14),0px 0px 5px 7px rgba(59, 183, 142, 0.12)'
    }
  }
}))

export default useStyles
