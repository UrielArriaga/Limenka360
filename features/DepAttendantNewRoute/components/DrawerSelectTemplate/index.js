import { Box, Grid, IconButton, Drawer } from "@material-ui/core";
import { ZoomIn, ZoomOut } from "@material-ui/icons";
import React from "react";
import styles from "./DrawerSelectTemplate.module.css";
import { myTemplates, totalIVA } from "../../constants";

export default function DrawerSelectTemplate({
  open,
  closeDrawer,
  preview,
  zoomCount,
  emailUpdate,
  setEmailUpdate,
  handleTemplateDrawer,
  RenderSelectTemplate,
  templateData,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={closeDrawer} classes={{ paper: styles.drawerPaper }}>
      <div className={styles.drawertop}>
        <p className={styles.drawertopTitle}>Generar garantía</p>
      </div>
      <Grid container className={styles.drawer}>
        <Grid item xs={6} sm={4} md={4} className={styles.selection}>
          <div className={styles.drawerTemplates}>
            <p>Plantillas disponibles</p>
            {myTemplates.map((item, index) => (
              <Grid item xs={6} sm={4} md={4} key={index} className={styles.template}>
                <div
                  className={`${styles.card} ${item.index === preview && styles.cardSelected}`}
                  onClick={() => handleTemplateDrawer(item)}
                >
                  <img width="160" src={item.img} alt={item.name} />
                </div>
              </Grid>
            ))}
          </div>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item xs={6} sm={4} md={6} className={styles.preview}>
          <div className={styles.updateEmail}>
            <p className={styles.textMail}>Cotizas por otra esfera cambia tu email: </p>
            <input
              placeholder="Escribe aquí el nuevo email"
              value={emailUpdate}
              name="email"
              onChange={e => setEmailUpdate(e.target.value)}
            />
          </div>
          <div className={styles.previewContainer}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setZoomCount(prev => prev + 10)}>
                <ZoomIn />
              </IconButton>
              <p>{zoomCount}%</p>
              <IconButton onClick={() => setZoomCount(prev => prev - 10)}>
                <ZoomOut />
              </IconButton>
            </Box>
            {RenderSelectTemplate && (
              <RenderSelectTemplate
                data={templateData}
                zoom={zoomCount}
                emailUpdate={emailUpdate}
                totalIVA={totalIVA}
              />
            )}
          </div>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </Drawer>
  );
}
