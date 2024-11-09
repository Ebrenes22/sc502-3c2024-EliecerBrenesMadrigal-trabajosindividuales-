<?php

// Arreglo de transacciones
$transacciones = [];

// Función para registrar transacciones
function registrarTransaccion($id, $descripcion, $monto): void
{
    global $transacciones;

    // Añade una nueva transacción al final del arreglo
    array_push($transacciones, [
        "id" => $id,
        "descripcion" => $descripcion,
        "monto" => $monto
    ]);
}

//Agregar transacciones al arreglo
registrarTransaccion(1, "Gasolina", 10000);
registrarTransaccion(2, "Supermercado", 5000);
registrarTransaccion(3, "Gasolina", 10000);

function generarEstadoDeCuenta(): void
{
    global $transacciones;

    // Variables para acumular los totales
    $totalContado = 0;
    $totalConInteres = 0;
    $totalCashback = 0;


    $archivo = fopen("estado_cuenta.txt", "w");

    if ($archivo) {

        fwrite($archivo, "Estado de Cuenta\n");
        fwrite($archivo, "Detalle de Transacciones:\n");
        fwrite($archivo, "----------------------------------------\n");

        foreach ($transacciones as $registro) {

            // Calcula valores para la transacción actual
            $montoContado = $registro['monto'];
            $montoConInteres = $montoContado * 1.026;
            $cashback = $montoContado * 0.001;
            $montoFinalAPagar = $montoConInteres - $cashback;

            // Escribir los detalles de cada transacción
            fwrite($archivo, "ID: " . $registro['id'] . "\n");
            fwrite($archivo, "Descripción: " . $registro['descripcion'] . "\n");
            fwrite($archivo, "Monto Contado: ¢" . number_format($montoContado, 2) . "\n");
            fwrite($archivo, "Monto con Interés (2.6%): ¢" . number_format($montoConInteres, 2) . "\n");
            fwrite($archivo, "Cashback (0.1%):  ¢" . number_format($cashback, 2) . "\n");
            fwrite($archivo, "Monto Final a Pagar: ¢" . number_format($montoFinalAPagar, 2) . "\n");
            fwrite($archivo, "----------------------------------------\n");

            // Acumular totales
            $totalContado += $montoContado;
            $totalConInteres += $montoConInteres;
            $totalCashback += $cashback;
        }

        // Mostrar los totales
        fwrite($archivo, "\nDetalle de Totales:\n");
        fwrite($archivo, "Total Monto Contado: ¢" . number_format($totalContado, 2) . "\n");
        fwrite($archivo, "Total Monto con Interés: ¢" . number_format($totalConInteres, 2) . "\n");
        fwrite($archivo, "Total Cashback: ¢" . number_format($totalCashback, 2) . "\n");
        fwrite($archivo, "Total Monto Final a Pagar: ¢" . number_format($totalConInteres - $totalCashback, 2) . "\n");
        fwrite($archivo, PHP_EOL);

        fclose($archivo);

        echo "Estado de cuenta generado exitosamente.\n";
    } else {
        echo "Error al crear el archivo de estado de cuenta.\n";
    }
}

generarEstadoDeCuenta();
